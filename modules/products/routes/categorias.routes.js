const caRouter = require('express').Router();
const { celebrate, Joi, errors, Segments } = require('celebrate');
const Cat_service = require('../services/CategoryService');
const cat = new Cat_service();
const isAuth = require('../../../shared/http/middlewares/isAuthenticated');

caRouter.get('/', cat.index);
caRouter.put('/:id', cat.update);
caRouter.get('/:id', cat.filtrarTudoPeloIdDaCategoria);
caRouter.post('/', cat.create);
module.exports = caRouter;
