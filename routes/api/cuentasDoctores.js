const express = require("express");
const router = express.Router();
const bd = require("../../bd");

// let auth = function (req, res, next) {
//     if (req.session.authenticated)
//         return next();
//     else
//         return res.sendStatus(401);
// };

// CREAR CUENTA
router.post("/", (req, res, next) => {
  if (req.body.idDoctor === "") {
    return res.status(401).send({
      message: "No se llenaron los campos requeridos..",
    });
  }
  const cuenta = {
    idDoctor: req.body.idDoctor,
    saldo: req.body.saldo,
    gananciasTot: req.body.gananciasTot,
  };
  bd.models.cuentaDoctor
    .create(cuenta)
    .then((data) => {
      res.status(200).send();
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send();
    });
});

// OBTENER CUENTAS
router.get("/", (req, res, next) => {
  bd.models.cuentaDoctor
    .findAll({
      raw: true,
      attributes: ["id", "saldo", "gananciasTot"],
      where: { idDoctor: req.body.idDoctor },
    })
    .then((data) => {
      if (data === null) {
        return res.status(401).send({
          message: "Cuentas no encontradas.",
        });
      }
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send({
        message: "Error al procesar la solicitud.",
      });
    });
});

// ELIMINAR CUENTA
router.delete("/", (req, res, next) => {
  bd.models.cuentaDoctor
    .destroy({
      where: { id: req.body.id_cuenta },
    })
    .then((data) => {
      if (data === null) {
        return res.status(401).send({
          message: "Cuenta no encontrada.",
        });
      }
      res.status(200).send();
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send();
    });
});

module.exports = router;
