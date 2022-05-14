const express = require("express");
const router = express.Router();
const bd = require("../../bd");

// let auth = function (req, res, next) {
//     if (req.session.authenticated)
//         return next();
//     else
//         return res.sendStatus(401);
// };

// CREAR INFO
router.post("/", (req, res, next) => {
  if (
    req.body.nombreC === "" ||
    req.body.identificacion === "" ||
    req.body.firma === "" ||
    req.body.sexo === "" ||
    req.body.fechaNac === "" ||
    req.body.foto === "" ||
    req.body.especialidad === "" ||
    req.body.horario === "" ||
    req.body.precioCons === "" ||
    req.body.direccionCons === "" ||
    req.body.Descripcion === ""
  ) {
    return res.status(401).send({
      message: "No se llenaron los campos requeridos..",
    });
  }
  const info = {
    idPaciente: req.body.idPaciente,
    nombreC: req.body.nombreC,
    identificacion: req.body.identificacion,
    firma: req.body.firma,
    sexo: req.body.sexo,
    fechaNac: req.body.fechaNac,
    foto: req.body.foto,
    especialidad: req.body.especialidad,
    horario: req.body.horario,
    precioCons: req.body.precioCons,
    direccionCons: req.body.direccionCons,
    Descripcion: req.body.Descripcion,
  };
  bd.models.infoPaciente
    .create(info)
    .then((data) => {
      res.status(200).send();
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send();
    });
});

// OBTENER INFO
router.get("/", (req, res, next) => {
  bd.models.infoPaciente
    .findAll({
      raw: true,
      attributes: [
        "celular",
        "tipoSangre",
        "sexo",
        "fechaNac",
        "foto",
        "direccion",
        "discapacidad",
      ],
      where: { idDoctor: req.body.idPaciente },
    })
    .then((data) => {
      if (data === null) {
        return res.status(401).send({
          message: "Información no encontrada.",
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

// ELIMINAR INFO
router.delete("/", (req, res, next) => {
  bd.models.infoPaciente
    .destroy({
      where: { id: req.body.idPaciente },
    })
    .then((data) => {
      if (data === null) {
        return res.status(401).send({
          message: "Paciente no encontrado.",
        });
      }
      res.status(200).send();
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send();
    });
});

// ACTUALIZAR INFO
router.post("/actualizar", (req, res, next) => {
  bd.models.infoPaciente
    .update(
      {
        celular: req.body.celular,
        tipoSangre: req.body.tipoSangre,
        sexo: req.body.sexo,
        fechaNac: req.body.fechaNac,
        foto: req.body.foto,
        direccion: req.body.direccion,
        discapacidad: req.body.discapacidad,
      },
      {
        where: { id: req.body.idPaciente },
      }
    )
    .then((data) => {
      if (data === null) {
        return res.status(401).send({
          message: "Doctor no encontrado.",
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
