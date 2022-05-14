const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Favorito', {
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
    }
  }, {
    sequelize,
    tableName: 'Favorito',
    timestamps: false
  });
};
