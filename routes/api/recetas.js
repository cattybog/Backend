const express = require("express");
const router = express.Router();
const bd = require("../../bd");

// let auth = function (req, res, next) {
//     if (req.session.authenticated)
//         return next();
//     else
//         return res.sendStatus(401);
// };

// CREAR RECETA
router.post("/crearReceta", (req, res, next) => {
  if (
    req.body.idPaciente === "" ||
    req.body.idDoctor === "" ||
    req.body.fecha === "" ||
    req.body.datos === "" ||
    req.body.prescripcion === ""
  ) {
    return res.status(401).send({
      message: "No se llenaron los campos requeridos..",
    });
  }
  const receta = {
    datos: req.body.datos,
    fecha: req.body.fecha,
    idPaciente: req.body.idPaciente,
    idDoctor: req.body.idDoctor,
    prescripcion: req.body.prescripcion,
  };
  bd.models.Receta.create(receta)
    .then((data) => {
      res.status(200).send();
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send();
    });
});

// OBTENER RECETAS
router.post("/get", (req, res, next) => {
  if (req.body.esDoctor) {
    bd.models.Receta.findAll({
      raw: true,
      attributes: ["id", "idPaciente", "idDoctor", "fecha", "prescripcion", "datos"],
      where: { idDoctor: req.body.idDoctor },
    })
      .then((data) => {
        if (data === null) {
          return res.status(401).send({
            message: "Recetas no encontradas.",
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
    bd.models.Receta.findAll({
      raw: true,
      attributes: ["id", "idDoctor", "fecha", "prescripcion", "datos"],
      where: { idPaciente: req.body.idPaciente },
    })
      .then((data) => {
        if (data === null) {
          return res.status(401).send({
            message: "Recetas no encontradas.",
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

// ELIMINAR RECETA
router.delete("/", (req, res, next) => {
  bd.models.Receta.destroy({
    where: { id: req.body.id_receta },
  })
    .then((data) => {
      if (data === null) {
        return res.status(401).send({
          message: "Receta no encontrada.",
        });
      }
      res.status(200).send();
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send();
    });
});

// ACTUALIZAR RECETA
router.post("/actualizar", (req, res, next) => {
  bd.models.Receta.update(
    { fecha: req.body.fecha, datos: req.body.datos, prescripcion: req.body.prescripcion },
    {
      where: { id: req.body.id_receta },
    }
  )
    .then((data) => {
      if (data === null) {
        return res.status(401).send({
          message: "Receta no encontrada.",
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
