const { json } = require("express");
const knex = require("../database/knex");
class IngredientsControllers {
  async index(request, response) {
    try {
      const ingredients = await knex("ingredients").orderBy(
        "ingredients.name",
        "asc"
      );

      return response.json(ingredients);
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
