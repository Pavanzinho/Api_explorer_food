const { Router } = require('express');
const platesRoutes = Router();
const PlatesController = require("../controllers/PlatesController")
const platesController = new PlatesController()
const AvatarPlateController = require("../controllers/AvatarPlateController")
const avatarPlateController = new AvatarPlateController()
const multer = require("multer")
const uploadConfig = require("../config/upload")
const upload = multer(uploadConfig.MULTER)
const ensureAuthenticated = require("../midllewares/ensureAuthenticated")

platesRoutes.use(ensureAuthenticated);
platesRoutes.post("/", upload.single("avatar"), platesController.create);
platesRoutes.delete("/:id", platesController.delete);
platesRoutes.get('/', platesController.admIndex);
platesRoutes.get('/client', platesController.clientIndex);
platesRoutes.get("/:id", upload.single("avatar"),platesController.show);
platesRoutes.put("/:id", upload.single("avatar"), platesController.update);


module.exports = platesRoutes;