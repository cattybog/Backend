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
    req.body.idDoctor === "" ||
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
    idDoctor: req.body.idDoctor,
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
  bd.models.infoDoctores
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
router.post("/get", (req, res, next) => {
  bd.models.infoDoctores
    .findAll({
      raw: true,
      attributes: [
        "nombreC",
        "identificacion",
        "firma",
        "sexo",
        "fechaNac",
        "foto",
        "especialidad",
        "horario",
        "precioCons",
        "direccionCons",
        "Descripcion",
      ],
      where: { idDoctor: req.body.idDoctor },
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

// OBTENER INFO
router.post("/getAllConsultas", (req, res, next) => {
  bd.models.infoDoctores
    .findAll({
      raw: true,
      attributes: [
        "nombreC",
        "identificacion",
        "firma",
        "sexo",
        "fechaNac",
        "foto",
        "especialidad",
        "horario",
        "precioCons",
        "direccionCons",
        "Descripcion",
      ],
      // where: { idDoctor: req.session.idDoctor },
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

// OBTENER INFO
router.post("/getPorPaciente", (req, res, next) => {
  bd.models.infoDoctores
    .findAll({
      raw: true,
      attributes: [
        "nombreC",
        "identificacion",
        "firma",
        "sexo",
        "fechaNac",
        "foto",
        "especialidad",
        "horario",
        "precioCons",
        "direccionCons",
        "Descripcion",
      ],
      where: { idDoctor: req.body.idDoctor },
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

//OBTENER INFO
router.post('/todosInfoDoctores', (req, res, next) => {
    bd.models.infoDoctores.findAll({
        raw: true,
        attributes: ['idDoctor','nombreC', 'identificacion', 'firma',
        'sexo', 'fechaNac', 'foto', 'especialidad', 'horario', 'precioCons',
        'direccionCons', 'Descripcion',],
        // where: {}
    }).then(data => {
        if (data === null) {
            res.status(401).send({
                message: "El doctor no existe."
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

// ELIMINAR INFO
router.delete("/", (req, res, next) => {
  bd.models.infoDoctores
    .destroy({
      where: { idDoctor: req.body.idDoctor },
    })
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

// ACTUALIZAR INFO
router.post("/actualizar", (req, res, next) => {
  var campos = {
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
  const campos_arr = Object.entries(campos);
  const filtered = campos_arr.filter(([key, value]) => !(value === undefined));
  const campos_ob = Object.fromEntries(filtered);
  bd.models.infoDoctores
      .update(
          campos_ob,
          {
              where: { idDoctor: req.body.idDoctor },
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
