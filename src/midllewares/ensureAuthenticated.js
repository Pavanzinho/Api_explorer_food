const { verify } = require("jsonwebtoken");
const authConfig = require("../config/auth");
const AppError = require("../utils/AppError");

function ensureAuthentication(request, response, next) {
    const authHeader = request.headers.authorization; 

    if (!authHeader) {
        throw new AppError("JTW Token não informado ", 401)
    }

    const [, token] = authHeader.split(" ") 

    if (!token) {
        throw new AppError("JTW Token Inválido ", 401)
    }

    try {    
        const { sub: user_id,is_admin } = verify(token, authConfig.jwt.secret) 
        request.user = { 
            id: Number(user_id),
            is_admin:Boolean(is_admin)
        }
        return next()


    }
    catch {
        throw new AppError("JTW Token Inválido ", 401)
    }

}
module.exports = ensureAuthentication;