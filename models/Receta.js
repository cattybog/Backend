const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Receta', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idPaciente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Paciente',
        key: 'id'
      }
    },
    idDoctor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Doctor',
        key: 'id'
      }
    },
    fecha: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    datos: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    prescripcion: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Receta',
    timestamps: false
  });
};
