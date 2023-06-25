const { json } = require("express");
const knex = require("../database/knex")
class IngredientsControllers {
    async index(request, response) {
        const user_id = request.user.id;
        const is_admin = request.user.is_admin

        try {
            const ingredients = await knex("ingredients")

                .where(function () {
                    if (is_admin === true) {
                        this.where("ingredients.plate_id", user_id)
                    }
                })
                .orderBy("ingredients.name", "asc")

            return response.json(ingredients)


        } catch (error) {
            response.status(500).json({ error: "Falha na busca " });
        }

    }

    // async clientIndex(request, response) {
    //     try {
    //         const ingredients = await knex("ingredients")
    //         return response.json(ingredients)

    //     } catch (error) {
    //         response.status(500).json({ error: "Falha ao inserir prato na tabela" });
    //     }

    // }
}

module.exports = IngredientsControllers;