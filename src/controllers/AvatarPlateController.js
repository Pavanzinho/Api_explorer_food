const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const DiskStorage = require("../providers/DiskStorage")

const diskStorage = new DiskStorage();

class AvatarPlateController {
    async create(request, response) {
        const avatarFileName = request.file.filename;
            try {
                const filename = await diskStorage.saveFile(avatarFileName);
                await knex("plates").insert({avatar:filename});

                response.json({message:"avatar uploaded successfully"})

            }catch{
                response.status(500).json({error:"failed to upload avatar"})
        }

    }
}
module.exports = AvatarPlateController;