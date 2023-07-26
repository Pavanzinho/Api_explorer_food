const AppError = require("../utils/AppError");
const knex = require("../database/knex");

class PlatesController {
  async create(request, response) {
    const user_id = request.user.id;
    let {
      plate_title,
      plate_description,
      plate_price,
      ingredients,
      plate_category,
    } = request.body;
    let plateCategory = plate_category ? plate_category : "refeições";

    if (!Array.isArray(ingredients)) {
      ingredients = [ingredients];
    }

    if (!request.file) {
      throw new AppError("imagem não recebida pela requisição", 400);
    }
    const filename = request.file.filename;

    try {
      const [plate_id] = await knex("plates").insert({
        plate_title,
        plate_description,
        plate_price,
        user_id,
        avatar: filename,
        plate_category: plateCategory,
      });

      for (const ingredient of ingredients) {
        const ingredientsInsert = {
          plate_id,
          name: ingredient,
          user_id,
        };

        await knex("ingredients").insert(ingredientsInsert);
      }

      response.status(201).json({ message: "Plate created successfully" });
    } catch (error) {
      response.status(500).json({ error: "Falha ao inserir prato na tabela" });
    }
  }

  async update(request, response) {
    const { id } = request.params;
    let {
      plate_title,
      plate_description,
      plate_price,
      ingredients,
      plate_category,
    } = request.body;
    const user_id = request.user.id;

    try {
      let actuallyData = await knex("plates")
        .select(
          "plate_title",
          "plate_description",
          "plate_price",
          "avatar",
          "plate_category"
        )
        .where({ id })
        .first();

      let filename = request.file ? request.file.filename : actuallyData.avatar;

      let newData = {
        plate_title,
        plate_description,
        plate_price,
        avatar: filename,
        plate_category,
      };

      let updateData = { ...actuallyData, ...newData };
      console.log(updateData);

      await knex("plates").where({ id }).update(updateData);

      if (ingredients && !Array.isArray(ingredients)) {
        ingredients = [ingredients];
        await knex("ingredients").where({ plate_id: id }).del();

        const ingredientsInsert = ingredients.map((name) => {
          return {
            plate_id: id,
            name,
            user_id: user_id,
          };
        });

        await knex("ingredients").insert(ingredientsInsert);
      }

      response.status(200).json({ message: "Prato atualizado com sucesso." });
    } catch (error) {
      response
        .status(500)
        .json({ error: "Falha ao atualizar prato na tabela" });
    }
  }

  async delete(request, response) {
    const { id } = request.params;

    await knex("plates").where({ id }).delete();

    return response.json();
  }

  async show(request, response) {
    const { id } = request.params;
    const plate = await knex("plates").where({ id }).first();

    return response.json(plate);
  }

  async index(request, response) {
    const { search } = request.query;
    const user_id = request.user.id;
    const is_admin = request.user.is_admin;

    const plates = await knex("plates")
      .select(["plates.user_id"])
      .join("users", "plates.user_id", "=", "users.id")
      .leftJoin("ingredients", "plates.id", "=", "ingredients.plate_id")
      .select("plates.*")
      .where(function () {
        if (is_admin === true) {
          this.where("users.id", user_id);
        }
        if (search) {
          this.where("plates.plate_title", "like", `%${search}%`).orWhere(
            "ingredients.name",
            "like",
            `%${search}%`
          );
        }
      })
      .distinct("plates.id")
      .orderBy("plates.plate_title", "asc");

    return response.json(plates);
  }
}

module.exports = PlatesController;
