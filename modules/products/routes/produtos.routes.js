const prodRouter = require('express').Router();
const { celebrate, Joi, errors, Segments } = require('celebrate');
const ProductController = require('../controllers/ProdutosController');
const prodController = new ProductController();
const isAuth = require('../../../shared/http/middlewares/isAuthenticated');

// prodRouter.get('/', prodController.index);
// prodRouter.put('/:id', prodController.update);
// prodRouter.get('/:id', prodController.filtrarTudoPeloIdDaCategoria);
prodRouter.delete('/:id', prodController.delete);
// prodRouter.get('/:id', prodController.listUnic);
// prodRouter.get('/', prodController.list);
prodRouter.put('/:id', prodController.update);

module.exports = prodRouter;
