const userRoter = require('express').Router();
const { celebrate, Joi, errors, Segments } = require('celebrate');
const PermissaoController = require('../../users/controllers/PermissoesController');
const PController = new PermissaoController();
const isAuth = require('../../../shared/http/middlewares/isAuthenticated');
userRoter.post('/:id', celebrate({

    [Segments.BODY]: Joi.object().keys({
        permissao: Joi.required()

    })
}), PController.create);

userRoter.use(errors());
module.exports = userRoter;