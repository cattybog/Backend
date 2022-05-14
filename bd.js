const { Sequelize } = require("sequelize");
const {initModels} = require("./models/init-models");

const db = new Sequelize({
  dialect: "sqlite",
  storage: "TEConsultasBD.db",
});

let models = initModels(db);

// db.sync({force: true})
//     .then(() => {
//         console.log(`Database & tables created!`)
//     });

db.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = {models, db};