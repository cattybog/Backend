const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('infoDoctores', {
    idDoctor: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Doctor',
        key: 'id'
      },
      primaryKey: true
    },
    nombreC: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    identificacion: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    firma: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    sexo: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fechaNac: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    foto: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    especialidad: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    horario: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    precioCons: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    direccionCons: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Descripcion: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'infoDoctores',
    timestamps: false
  });
};
