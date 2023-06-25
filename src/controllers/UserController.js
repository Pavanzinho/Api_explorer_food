const sqliteConnection = require("../database/sqlite");
const { hash, compare } = require("bcryptjs");
const AppError = require("../utils/AppError")
const knex = require("../database/knex")

class UserController {

    async create(request, response) {
        const { name, email, password, is_adm } = request.body;
        const checkingIfEmailAlreadyExists = await knex("users").where({ email: email }).first();

        if (checkingIfEmailAlreadyExists) {
            throw new AppError("este email já é cadastrado")
        };

        const hashedPassword = await hash(password, 8);

        await knex("users").insert({
            name: name,
            email: email,
            password: hashedPassword,
            is_admin: is_adm
        })
        response.status(201).json();
    }


    async update(request, response) {
        const { name, email, newPassword, oldPassword } = request.body;
        const user_id = request.user.id;
        const knex = require('knex')(/* configurações da conexão com o banco de dados */);

        const user = await knex('users')
            .where('id', user_id)
            .first();

        if (!user) {
            throw new AppError('Usuário não cadastrado');
        }

        const userWithRegisteredEmail = await knex('users')
            .where('email', email)
            .whereNot('id', user_id)
            .first();

        if (userWithRegisteredEmail) {
            throw new AppError('Email já cadastrado!');
        }

        if (newPassword && !oldPassword) {
            throw new AppError('Senha antiga não informada!');
        }

        if (newPassword && oldPassword) {
            const isOldPasswordValid = await compare(oldPassword, user.password)

            if (!isOldPasswordValid) {
                throw new AppError('Esta não é sua senha antiga!');
            }
        }

        const updatedUser = {
            name: name || user.name,
            email: email || user.email,
            updated_at: knex.fn.now()
        };

        if (newPassword) {
            updatedUser.password = await hash(newPassword, 8);
        }

        await knex('users')
            .where('id', user_id)
            .update(updatedUser);

        return response.status(200).json();
    }
}

module.exports = UserController;