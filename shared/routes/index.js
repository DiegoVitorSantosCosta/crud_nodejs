const router = require('express').Router();
const userRoter = require('../../modules/users/routes/routes');
const sessionRouter = require('../../modules/users/routes/session.routes');
const permissaoRouter = require('../../modules/users/routes/permissao.routes');
const cat_SubCat_Router = require('../../modules/products/routes/ninchoCat_subCat_prod.routes');
const categoriaRouter = require('../../modules/products/routes/categorias.routes');
const subCatRouter = require('../../modules/products/routes/sub_categoria.routes');
const produtoRouter = require('../../modules/products/routes/produtos.routes');

router.use('/login', userRoter)
router.use('/session', sessionRouter)
router.use('/permissao', permissaoRouter);
router.use('/ninchos', cat_SubCat_Router);
router.use('/categorias', categoriaRouter);
router.use('/subcategorias', subCatRouter);
router.use('/produtos', produtoRouter);
module.exports = router;