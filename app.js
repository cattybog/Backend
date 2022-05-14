var createError = require("http-errors");
var express = require("express");
var path = require("path");
const cors = require("cors");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
// var bodyParser = require('body-parser');
// var session = require('express-session');
var bd = require("./bd");

var app = express();

const port = process.env.PORT || 3005;

// console.log("Mode: " + process.env.NODE_ENV);
console.log("Port: " + port);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(logger("dev"));
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Private-Network", "true");
  next();
});
const corsOptions = {
  origin: "http://localhost",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Controladores
const indexRouter = require("./routes/index");
const doctoresRouter = require("./routes/api/doctores");
const pacientesRouter = require("./routes/api/pacientes");
const consultasRouter = require("./routes/api/consultas");
const pagosRouter = require("./routes/api/pagos");
const recetasRouter = require("./routes/api/recetas");
const mensajesRouter = require("./routes/api/mensajes");
const favoritosRouter = require("./routes/api/favoritos");
const infodoctoresRouter = require("./routes/api/infodoctores");
const infopacientesRouter = require("./routes/api/infopacientes");
const cuentasdoctoresRouter = require("./routes/api/cuentasdoctores");

// Rutas API
app.use("/", indexRouter);

app.use("/api/doctores", doctoresRouter);
app.use("/api/pacientes", pacientesRouter);

app.use("/api/consultas", consultasRouter);
app.use("/api/pagos", pagosRouter);
app.use("/api/recetas", recetasRouter);
app.use("/api/mensajes", mensajesRouter);
app.use("/api/favoritos", favoritosRouter);
app.use("/api/infodoctores", infodoctoresRouter);
app.use("/api/infopacientes", infopacientesRouter);
app.use("/api/cuentasdoctores", cuentasdoctoresRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(port);

module.exports = app;
