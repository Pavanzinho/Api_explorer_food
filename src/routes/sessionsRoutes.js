const { Router } = require('express');
const sessionRoutes = Router();
const SessionController = require("../controllers/SessionController")
const sessionController = new SessionController()
const ensureAuthenticated = require("../midllewares/ensureAuthenticated");


sessionRoutes.post("/", sessionController.create)

module.exports = sessionRoutes;