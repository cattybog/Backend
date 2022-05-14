const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cuentaDoctor', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idDoctor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Doctor',
        key: 'id'
      },
      unique: true
    },
    saldo: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    gananciasTot: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'cuentaDoctor',
    timestamps: false,
    indexes: [
      {
        name: "sqlite_autoindex_cuentaDoctor_1",
        unique: true,
        fields: [
          { name: "idDoctor" },
        ]
      },
    ]
  });
};
