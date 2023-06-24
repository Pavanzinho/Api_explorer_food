const { Router } = require("express");
const usersRoutes = Router();

const UserController = require("../controllers/UserController")
const userController = new UserController;
const ensureAuthenticated=require("../midllewares/ensureAuthenticated")

usersRoutes.post("/", userController.create);
usersRoutes.put("/", ensureAuthenticated, userController.update)

module.exports = usersRoutes;