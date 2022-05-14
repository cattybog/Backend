const express = require("express");
const router = express.Router();
const bd = require("../../bd");

// let auth = function (req, res, next) {
//     if (req.session.authenticated)
//         return next();
//     else
//         return res.sendStatus(401);
// };

// CREAR PAGO
router.post("/", (req, res, next) => {
  if (
    req.body.idPaciente === "" ||
    req.body.idDoctor === "" ||
    req.body.fecha === "" ||
    req.body.monto === ""
  ) {
    return res.status(401).send({
      message: "No se llenaron los campos requeridos..",
    });
  }
  const pago = {
    monto: req.body.monto,
    fecha: req.body.fecha,
    idPaciente: req.body.idPaciente,
    idDoctor: req.body.idDoctor
  };
  bd.models.Pago.create(pago)
    .then((data) => {
      res.status(200).send();
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send();
    });
});

// OBTENER PAGOS
router.get("/", (req, res, next) => {
  if (req.body.esDoctor) {
    bd.models.Pago.findAll({
      raw: true,
      attributes: ["id", "fecha", "monto"],
      where: { idDoctor: req.body.idDoctor },
    })
      .then((data) => {
        if (data === null) {
          return res.status(401).send({
            message: "Pagos no encontrados.",
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
    bd.models.Pago.findAll({
      raw: true,
      attributes: ["id", "fecha", "monto"],
      where: { idPaciente: req.body.idPaciente },
    })
      .then((data) => {
        if (data === null) {
          return res.status(401).send({
            message: "Pagos no encontrados.",
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

// ELIMINAR PAGO
router.delete("/", (req, res, next) => {
  bd.models.Pago.destroy({
    where: { id: req.body.id_pago },
  })
    .then((data) => {
      if (data === null) {
        return res.status(401).send({
          message: "Pago no encontrado.",
        });
      }
      res.status(200).send();
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send();
    });
});

// ACTUALIZAR PAGO
router.post("/actualizar", (req, res, next) => {
  bd.models.Pago.update(
    {
      fecha: req.body.fecha,
      monto: req.body.monto
    },
    {
      where: { id: req.body.id_pago },
    }
  )
    .then((data) => {
      if (data === null) {
        return res.status(401).send({
          message: "Pago no encontrado.",
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
