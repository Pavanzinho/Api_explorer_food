const { Router } = require("express");
const path = require("path");

const routes = Router();
const usersRoutes = require("./usersRoutes");
const platesRoutes = require("./platesRoutes");
const ingredientsRoutes = require("./ingredientsRoutes");
const sessionRoutes = require("./sessionsRoutes");

routes.use("/sessions", sessionRoutes)
routes.use("/users", usersRoutes);
routes.use("/plates", platesRoutes);
routes.use("/ingredients", ingredientsRoutes);

module.exports = routes;

