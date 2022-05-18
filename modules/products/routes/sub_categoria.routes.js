const caRouter = require('express').Router();
const { celebrate, Joi, errors, Segments } = require('celebrate');
const SubCatService = require('../services/SubCategoriaService');
const subCat = new SubCatService();
const isAuth = require('../../../shared/http/middlewares/isAuthenticated');

caRouter.get('/', subCat.index);
caRouter.put('/:id', subCat.update);
caRouter.get('/:id', subCat.filtrarTudoPeloIdDaCategoria);
caRouter.post('/', subCat.create);
module.exports = caRouter;
