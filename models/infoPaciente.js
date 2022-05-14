const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('infoPaciente', {
    idPaciente: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Paciente',
        key: 'id'
      },
      primaryKey: true
    },
    foto: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    celular: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    direccion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    fechaNac: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    sexo: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    discapacidad: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    tipoSangre: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'infoPaciente',
    timestamps: false
  });
};
