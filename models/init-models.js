var DataTypes = require("sequelize").DataTypes;
var _Consulta = require("./Consulta");
var _Doctor = require("./Doctor");
var _Favorito = require("./Favorito");
var _Mensaje = require("./Mensaje");
var _Paciente = require("./Paciente");
var _Pago = require("./Pago");
var _Receta = require("./Receta");
var _cuentaDoctor = require("./cuentaDoctor");
var _infoDoctores = require("./infoDoctores");
var _infoPaciente = require("./infoPaciente");

function initModels(sequelize) {
  var Consulta = _Consulta(sequelize, DataTypes);
  var Doctor = _Doctor(sequelize, DataTypes);
  var Favorito = _Favorito(sequelize, DataTypes);
  var Mensaje = _Mensaje(sequelize, DataTypes);
  var Paciente = _Paciente(sequelize, DataTypes);
  var Pago = _Pago(sequelize, DataTypes);
  var Receta = _Receta(sequelize, DataTypes);
  var cuentaDoctor = _cuentaDoctor(sequelize, DataTypes);
  var infoDoctores = _infoDoctores(sequelize, DataTypes);
  var infoPaciente = _infoPaciente(sequelize, DataTypes);

  Consulta.belongsTo(Doctor, { as: "idDoctor_Doctor", foreignKey: "idDoctor"});
  Doctor.hasMany(Consulta, { as: "Consulta", foreignKey: "idDoctor"});
  Favorito.belongsTo(Doctor, { as: "idDoctor_Doctor", foreignKey: "idDoctor"});
  Doctor.hasMany(Favorito, { as: "Favoritos", foreignKey: "idDoctor"});
  Mensaje.belongsTo(Doctor, { as: "idDoctor_Doctor", foreignKey: "idDoctor"});
  Doctor.hasMany(Mensaje, { as: "Mensajes", foreignKey: "idDoctor"});
  Pago.belongsTo(Doctor, { as: "idDoctor_Doctor", foreignKey: "idDoctor"});
  Doctor.hasMany(Pago, { as: "Pagos", foreignKey: "idDoctor"});
  Receta.belongsTo(Doctor, { as: "idDoctor_Doctor", foreignKey: "idDoctor"});
  Doctor.hasMany(Receta, { as: "Receta", foreignKey: "idDoctor"});
  cuentaDoctor.belongsTo(Doctor, { as: "idDoctor_Doctor", foreignKey: "idDoctor"});
  Doctor.hasMany(cuentaDoctor, { as: "cuentaDoctors", foreignKey: "idDoctor"});
  infoDoctores.belongsTo(Doctor, { as: "idDoctor_Doctor", foreignKey: "idDoctor"});
  Doctor.hasMany(infoDoctores, { as: "infoDoctores", foreignKey: "idDoctor"});
  Consulta.belongsTo(Paciente, { as: "idPaciente_Paciente", foreignKey: "idPaciente"});
  Paciente.hasMany(Consulta, { as: "Consulta", foreignKey: "idPaciente"});
  Favorito.belongsTo(Paciente, { as: "idPaciente_Paciente", foreignKey: "idPaciente"});
  Paciente.hasMany(Favorito, { as: "Favoritos", foreignKey: "idPaciente"});
  Mensaje.belongsTo(Paciente, { as: "idPaciente_Paciente", foreignKey: "idPaciente"});
  Paciente.hasMany(Mensaje, { as: "Mensajes", foreignKey: "idPaciente"});
  Pago.belongsTo(Paciente, { as: "idPaciente_Paciente", foreignKey: "idPaciente"});
  Paciente.hasMany(Pago, { as: "Pagos", foreignKey: "idPaciente"});
  Receta.belongsTo(Paciente, { as: "idPaciente_Paciente", foreignKey: "idPaciente"});
  Paciente.hasMany(Receta, { as: "Receta", foreignKey: "idPaciente"});
  infoPaciente.belongsTo(Paciente, { as: "idPaciente_Paciente", foreignKey: "idPaciente"});
  Paciente.hasMany(infoPaciente, { as: "infoPacientes", foreignKey: "idPaciente"});

  return {
    Consulta,
    Doctor,
    Favorito,
    Mensaje,
    Paciente,
    Pago,
    Receta,
    cuentaDoctor,
    infoDoctores,
    infoPaciente,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
