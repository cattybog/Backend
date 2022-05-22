const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const bd = require('../../bd');

// CREAR PACIENTE (REGISTRO)
router.post('/registro', (req, res, next) => {
    if (req.body.nombre === "" || req.body.correo === "" || req.body.password == "") {
        return res.status(402).send();
    }
    bd.models.Paciente.findOne({
        raw: true,
        attributes: ['correo'],
        where: {correo: req.body.correo}
    }).then(data => {
        if (data === null) {
            const saltRounds = 10;
            bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
                // Store hash in your password DB.
                const paciente = {
                    nombre: req.body.nombre,
                    correo: req.body.correo,
                    password: hash
                };
                bd.models.Paciente.create(paciente)
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

router.post('/nombre', (req, res, next) => {
    bd.models.Paciente.findOne({
        raw: true,
        attributes: ['nombre', 'correo'],
        where: {id: req.body.idPaciente}
    }).then(data => {
        if (data === null) {
            res.status(401).send({
                message: "El usuario no existe."
            });
        } else {
            res.status(200).json({
                data
            });
        }
    }).catch(err => {
        console.log(err);
        res.status(400).send({
            message: "Error al procesar la solicitud."
        });
    });
});

// OBTENER PACIENTE (LOGIN)
router.post('/login', (req, res, next) => {
    bd.models.Paciente.findOne({
        raw: true,
        attributes: ['id', 'password'],
        where: {correo: req.body.correo ? req.body.correo : ""}
    }).then(data => {
        if (data === null) {
            return res.status(401).send({
                message: "Usuario no encontrado."
            });
        }
        bcrypt.compare(req.body.password, data.password, function (err, result) {
            if (result) {
                req.session.correo = req.body.correo;
                req.session.authenticated = true;
                res.status(200).json({
                    id: data.id
                });
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

//OBTENER INFO
router.post('/todosPacientes', (req, res, next) => {
    bd.models.Paciente.findAll({
        raw: true,
        attributes: ['id', 'nombre', 'correo',],
        // where: {id: req.body.idDoctor}
    }).then(data => {
        if (data === null) {
            res.status(401).send({
                message: "El paciente no existe."
            });
        } else {
            res.status(200).json({
                data
            });
        }
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

// CERRAR SESIÓN DEL PACIENTE
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