const express = require("express");
const router = express.Router();
const bd = require("../../bd");

// let auth = function (req, res, next) {
//     if (req.session.authenticated)
//         return next();
//     else
//         return res.sendStatus(401);
// };

// CREAR MENSAJE
router.post("/", (req, res, next) => {
  if (req.body.idPaciente === "" || req.body.idDoctor === "") {
    return res.status(401).send({
      message: "No se llenaron los campos requeridos..",
    });
  }
  const mensaje = {
    mensaje: req.body.mensaje,
    fecha: req.body.fecha,
    hora: req.body.hora,
    idPaciente: req.body.idPaciente,
    idDoctor: req.body.idDoctor,
  };
  bd.models.Mensaje.create(mensaje)
    .then((data) => {
      res.status(200).send();
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send();
    });
});

// OBTENER MENSAJES
router.get("/", (req, res, next) => {
  if (req.body.esDoctor) {
    bd.models.Mensaje.findAll({
      raw: true,
      attributes: ["id", "mensaje", "fecha", "hora"],
      where: { idDoctor: req.body.idDoctor },
    })
      .then((data) => {
        if (data === null) {
          return res.status(401).send({
            message: "Mensajes no encontrados.",
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
  } else {
    bd.models.Mensaje.findAll({
      raw: true,
      attributes: ["id", "mensaje", "fecha", "hora"],
      where: { idPaciente: req.body.idPaciente },
    })
      .then((data) => {
        if (data === null) {
          return res.status(401).send({
            message: "Mensajes no encontrados.",
          });
        }
        res.status(200).json(data);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send();
      });
  }
});

// ELIMINAR MENSAJE
router.delete("/", (req, res, next) => {
  bd.models.Mensaje.destroy({
    where: { id: req.body.id_mensaje },
  })
    .then((data) => {
      if (data === null) {
        return res.status(401).send({
          message: "Mensaje no encontrado.",
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
