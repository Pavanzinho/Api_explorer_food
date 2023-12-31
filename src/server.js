require('express-async-errors');
require('dotenv/config')
const migrationRun = require("./database/sqlite/migrations");
const AppError = require("./utils/AppError");


const express = require('express');
const app = express();
const cors = require("cors")
const routes = require("../src/routes")
const uploadConfig = require("./config/upload")
const ensureAuthenticated = require("./midllewares/ensureAuthenticated")


migrationRun();
app.use(express.json());
app.use(cors());
app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))
app.use(routes)

app.use((error, request, response, next) => {
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: 'error',
            message: error.message
        })
    }

    if (response.status(500)) {
        console.error(error)
    }

    return response.status(500).json({
        status: "error",
        message: "Internal Server error"
    })
})

const PORT = process.env.PORT;
app.listen(PORT,'0.0.0.0', () =>
    console.log((`Server is running at ${PORT}`)))