const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Doctor', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cedula: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    nombre: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    correo: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Doctor',
    timestamps: false,
    indexes: [
      {
        name: "sqlite_autoindex_Doctor_1",
        unique: true,
        fields: [
          { name: "correo" },
        ]
      },
    ]
  });
};
