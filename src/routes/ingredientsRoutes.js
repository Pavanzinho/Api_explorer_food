
const { Router } = require('express');
const ingredientsRoutes = Router()
const IngredientsControllers = require("../controllers/IngredientsController.js")
const ingredientsControllers = new IngredientsControllers;
const ensureAuthenticated = require("../midllewares/ensureAuthenticated")

ingredientsRoutes.get('/', ensureAuthenticated, ingredientsControllers.index)

module.exports = ingredientsRoutes;


