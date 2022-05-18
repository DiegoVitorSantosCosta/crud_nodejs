const knex = require('../../../knex');
const AppError = require('../../../shared/erros/AppError');
const sign = require('jsonwebtoken')
const authConfig = require('../../../config/auth');
const bcrypt = require('bcryptjs');
class SessionService {
    async execute(request, response) {

        let user = await knex('users').where('email', request.body.email).first();
        if (!user) {
            throw new AppError('Usuario não encondtrado', 404);
        }

        // let password = await bcrypt.compare(request.body.senha, user.senha).toString();
        if (request.body.senha != user.senha) {
            throw new AppError('Erro de authenticação', 401);
        }

        const token = sign.sign({}, authConfig.jwt.secret, {
            subject: user.id.toString(),
            expiresIn: authConfig.jwt.expiresIn,
        });

        return { token };

    }

}
module.exports = SessionService;