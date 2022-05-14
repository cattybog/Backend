const express = require("express");
const router = express.Router();
const bd = require("../../bd");

// let auth = function (req, res, next) {
//     if (req.session.authenticated)
//         return next();
//     else
//         return res.sendStatus(401);
// };

// CREAR FAVORITO
router.post("/", (req, res, next) => {
  if (
    req.body.idPaciente === "" ||
    req.body.idDoctor === ""
  ) {
    return res.status(401).send({
      message: "No se llenaron los campos requeridos..",
    });
  }
  const favorito = {
    idPaciente: req.body.idPaciente,
    idDoctor: req.body.idDoctor
  };
  bd.models.Favorito.create(favorito)
    .then((data) => {
      res.status(200).send();
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send();
    });
});

// OBTENER FAVORITOS
router.get("/", (req, res, next) => {
  if (req.body.esDoctor) {
    bd.models.Favorito.findAll({
      raw: true,
      attributes: ["id", "idPaciente"],
      where: { idDoctor: req.body.idDoctor },
    })
      .then((data) => {
        if (data === null) {
          return res.status(401).send({
            message: "Favoritos no encontrados.",
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
    bd.models.Favorito.findAll({
      raw: true,
      attributes: ["id", "idDoctor"],
      where: { idPaciente: req.body.idPaciente },
    })
      .then((data) => {
        if (data === null) {
          return res.status(401).send({
            message: "Favoritos no encontrados.",
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

// ELIMINAR FAVORITO
router.delete("/", (req, res, next) => {
  bd.models.Favorito.destroy({
    where: { id: req.body.id_favorito },
  })
    .then((data) => {
      if (data === null) {
        return res.status(401).send({
          message: "Favorito no encontrado.",
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
