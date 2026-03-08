const express = require("express");
const cors = require("cors");
const routes = require("../routes/kanbanRoutes");
const NotFoundError = require("../middlewares/errors/NotFoundError");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", routes);

app.use((req, res, next) => {
  next(new NotFoundError());
});

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = status >= 500 ? "Erreur interne du serveur" : error.message;
  res.status(status).json({
    error: message,
    message,
  });
});

module.exports = app;
