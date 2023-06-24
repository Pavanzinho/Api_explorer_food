const sqliteConnection = require("../database/sqlite");
const { hash, compare } = require("bcryptjs");
const AppError = require("../utils/AppError")
const knex = require("../database/knex")

class UserController {

    async create(request, response) {
        const { name, email, password, is_adm } = request.body;

        const checkingIfEmailAlreadyExists = await knex("users").where({ email: email }).first();

        ("checando se email já é cadastrado")
        if (checkingIfEmailAlreadyExists) {
            throw new AppError("este email já é cadastrado")
        };
        ("checagem completa");

        ("criptografando senha ");
        const hashedPassword = await hash(password, 8);
        ("criptografada com sucesso ")

            ("inserindo dados na tabela de usuários")
        await knex("users").insert({
            name: name,
            email: email,
            password: hashedPassword,
            is_admin: is_adm
        })
            ("dados inseridos")

        response.status(201).json();
    }


    async update(request, response) {
        const { name, email, newPassword, oldPassword } = request.body;
        const user_id = request.user.id;

        const database = await sqliteConnection();
        const user = await database.get('SELECT * FROM users WHERE id=(?)', [user_id]);



        if (!user) {
            throw new AppError("Usuário não cadastrado")
        }

        userWithRegisteredEmail = await database.get('SELECT * FROM users WHERE email=(?)', [email])

        if (userWithRegisteredEmail && userWithRegisteredEmail.id !== user_id) {
            throw new AppError("Email já cadastrado!")
        }

        if (newPassword && !oldPassword) {
            throw new AppError("Senha antiga não informada!")
        }

        if (newPassword && oldPassword) {
            const checkPassword = await compare(oldPassword, user.password)

            if (!checkPassword) {
                throw new AppError("Esta não é sua senha antiga !")
            }
        }

        user.name = name ?? user.name;
        user.email = email ?? user.email;
        user.password = await hash(newPassword, 8);

        await database.run(`
        UPDATE users SET
        name=?,
        email=?,
        password=?,
        updated_at= DATETIME('now'),
        WHERE id =?`,
            [user.name, user.email, user.password, user_id]
        );

        return res.status(200).json();


    }
}

module.exports = UserController;