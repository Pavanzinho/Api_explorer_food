const sqliteConnection = require("../../sqlite")

const createUsers = require("./createUsers");
const createPlates = require("./createPlates");
const createIngredient = require("./createIngredient");


async function migrationRun() {
    const schemas = `${createUsers};${createPlates};${createIngredient}`;

    const database = await sqliteConnection();

    await database.exec(schemas).catch(error => console.error(error))

}

module.exports = migrationRun;