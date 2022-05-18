const userRoter = require('express').Router();
const { celebrate, Joi, errors, Segments } = require('celebrate');
const UserController = require('../../users/controllers/UserController');
const userController = new UserController();
const isAuth = require('../../../shared/http/middlewares/isAuthenticated');
userRoter.post('/', celebrate({

    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().required().email(),
        senha: Joi.string().required(),
        nome: Joi.string().required(),
        permissao: Joi.optional()

    }),
    // [Segments.QUERY]: {
    //     token: Joi.string().token().required()
    // }
}), userController.execute);

userRoter.get('/', userController.list);
// userRoter.get('/', userController.create);
userRoter.use(errors());
module.exports = userRoter;