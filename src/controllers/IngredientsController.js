const { json } = require("express");
const knex = require("../database/knex")

class IngredientsControllers {
    async admIndex(request, response) {
        const user_id = request.user.id;

   
        const ingredients = await knex("ingredients")
            .where({ user_id })

        return response.json(ingredients)

    }

    async clientIndex(request, response) {

        const ingredients = await knex("ingredients")

        return response.json(ingredients)

    }




}

module.exports = IngredientsControllers;