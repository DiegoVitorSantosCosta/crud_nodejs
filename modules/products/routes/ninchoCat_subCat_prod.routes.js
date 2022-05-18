const cat_SubCat_Routes = require('express').Router();
const { celebrate, Joi, errors, Segments } = require('celebrate');
const CreateCat_SubCat_Prod = require('../services/CreateCat-SubCat-ProdService');
const cat_SubCat_Prod = new CreateCat_SubCat_Prod();
const isAuth = require('../../../shared/http/middlewares/isAuthenticated');

cat_SubCat_Routes.post('/', celebrate({

    [Segments.BODY]: Joi.object().keys({
        categoria: Joi.required(),
        subCategorias: Joi.required(),
        produtos: Joi.required()
    }),

}), cat_SubCat_Prod.create);

cat_SubCat_Routes.get('/', cat_SubCat_Prod.index);
cat_SubCat_Routes.put('/:id', cat_SubCat_Prod.update);
cat_SubCat_Routes.get('/:id', cat_SubCat_Prod.listUnic);
cat_SubCat_Routes.delete('/:id', cat_SubCat_Prod.delete);

cat_SubCat_Routes.use(errors());
module.exports = cat_SubCat_Routes;