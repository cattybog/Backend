const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const bd = require('../../bd');

// CREAR DOCTOR (REGISTRO)
router.post('/registro', (req, res, next) => {
    if (req.body.nombre === "" || req.body.correo === "" || req.body.password == "" || req.body.cedula === "") {
        return res.status(402).send();
    }
    bd.models.Doctor.findOne({
        raw: true,
        attributes: ['correo'],
        where: {correo: req.body.correo}
    }).then(data => {
        if (data === null) {
            const saltRounds = 10;
            bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
                // Store hash in your password DB.
                const doctor = {
                    nombre: req.body.nombre,
                    correo: req.body.correo,
                    cedula: req.body.cedula,
                    password: hash
                };
                bd.models.Doctor.create(doctor)
                    .then(data => {
                        res.status(200).send();
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(400).send({
                            message: "Error al procesar la solicitud."
                        });
                    });
            });
        } else {
            res.status(401).send({
                message: "El usuario ya existe."
            });
        }
    }).catch(err => {
        console.log(err);
        res.status(400).send({
            message: "Error al procesar la solicitud."
        });
    });

});

// OBTENER DOCTOR (LOGIN)
router.post('/login', (req, res, next) => {
    bd.models.Doctor.findOne({
        raw: true,
        attributes: ['password'],
        where: {correo: req.body.correo ? req.body.correo : ""}
    }).then(data => {
        if (data === null) {
            return res.status(401).send({
                message: "Usuario no encontrado."
            });
        }
        bcrypt.compare(req.body.password, data.password, function (err, result) {
            if (result) {
                // req.session.correo = req.body.correo;
                // req.session.authenticated = true;
                res.status(200).send();
            } else {
                res.status(402).send();
            }
        });
    }).catch(err => {
        console.log(err);
        res.status(400).send({
            message: "Error al procesar la solicitud."
        });
    });
});

// COMPROBAR AUTENTICACIÓN
router.get('/autenticado', (req, res) => {
    if (req.session.correo === undefined || req.session.authenticated === undefined) {
        return res.json({});
    }
    if (req.session.correo !== undefined && req.session.authenticated !== undefined) {
        if (req.session.authenticated == true) {
            return res.json({correo: req.session.correo, authenticated: req.session.authenticated.toString()});
        }
    }
    res.status(400).send({
        message: "Error al procesar la solicitud."
    });
});

// CERRAR SESIÓN DEL DOCTOR
router.get('/logout', (req, res) => {
    if (req.session.authenticated) {
        delete req.session.correo;
        req.session.authenticated = false;
        req.session.destroy((err) => {
            console.log(err);
        });
        res.clearCookie('connect.sid', {path: '/'});
        res.redirect('/');
    } else {
        res.status(400).send();
    }
});

module.exports = router;