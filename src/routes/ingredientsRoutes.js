
const { Router } = require('express');
const ingredientsRoutes = Router()
const IngredientsControllers = require("../controllers/IngredientsController.js")
const ingredientsControllers = new IngredientsControllers;
const ensureAuthenticated = require("../midllewares/ensureAuthenticated")


ingredientsRoutes.get('/adm', ensureAuthenticated, ingredientsControllers.admIndex)
ingredientsRoutes.get('/client', ensureAuthenticated, ingredientsControllers.clientIndex)
module.exports = ingredientsRoutes;


