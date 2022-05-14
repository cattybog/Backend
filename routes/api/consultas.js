const express = require("express");
const router = express.Router();
const bd = require("../../bd");

// let auth = function (req, res, next) {
//   if (req.session.authenticated) return next();
//   else return res.sendStatus(401);
// };

// CREAR CONSULTA
router.post("/", (req, res, next) => {
  if (req.body.fecha === "" || req.body.hora === "" || req.body.link === "") {
    return res.status(401).send({
      message: "No se llenaron los campos requeridos..",
    });
  }
  const consulta = {
    fecha: req.body.fecha,
    hora: req.body.hora,
    idPaciente: req.body.idPaciente,
    idDoctor: req.body.idDoctor,
    link: req.body.link,
  };
  bd.models.Consulta.create(consulta)
    .then((data) => {
      res.status(200).send();
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send();
    });
});

// OBTENER CONSULTAS
router.get("/", (req, res, next) => {
  if (req.body.esDoctor) {
    bd.models.Consulta.findAll({
      raw: true,
      attributes: ["id", "idPaciente", "fecha", "hora", "link"],
      where: { idDoctor: req.body.idDoctor },
    })
      .then((data) => {
        if (data === null) {
          return res.status(401).send({
            message: "Consultas no encontradas.",
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
    bd.models.Consulta.findAll({
      raw: true,
      attributes: ["id", "idDoctor", "fecha", "hora", "link"],
      where: { idPaciente: req.body.idPaciente },
    })
      .then((data) => {
        if (data === null) {
          return res.status(401).send({
            message: "Consultas no encontradas.",
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

// ELIMINAR CONSULTA
router.delete("/", (req, res, next) => {
  bd.models.Consulta.destroy({
    where: { id: req.body.id_consulta },
  })
    .then((data) => {
      if (data === null) {
        return res.status(401).send({
          message: "Consulta no encontrada.",
        });
      }
      res.status(200).send();
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send();
    });
});

// ACTUALIZAR CONSULTA
router.post("/actualizar", (req, res, next) => {
  bd.models.Consulta.update(
    { fecha: req.body.fecha, hora: req.body.hora, link: req.body.link },
    {
      where: { id: req.body.id_consulta },
    }
  )
    .then((data) => {
      if (data === null) {
        return res.status(401).send({
          message: "Consulta no encontrada.",
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
