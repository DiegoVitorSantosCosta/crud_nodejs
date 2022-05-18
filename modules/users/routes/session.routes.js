const sessionRouter = require('express').Router();
const { celebrate, Joi, errors, Segments } = require('celebrate');
const SessionController = require('../../users/controllers/SessionController');
const sessionController = new SessionController();
sessionRouter.post('/', celebrate({

    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().required().email(),
        senha: Joi.string().required(),

    }),
    // [Segments.QUERY]: {
    //     token: Joi.string().token().required()
    // }
}), sessionController.create);

// sessionRouter.get('/', userController.create);
sessionRouter.use(errors());
module.exports = sessionRouter;