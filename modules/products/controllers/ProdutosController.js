
const ProdService = require('../services/ProductService');
const AppError = require('../../../shared/erros/AppError');
const prodService = new ProdService();
class ProductController {
    async create(req, res, next) {
        let result = await prodService.create(req, res, next);
        if (result) {
            return res.json(result);
        }
        throw new AppError('Erro ao criar produtos', 400);

    }

    async index(req, res, next) {
        let result = await prodService.index(req, res, next);
        if (result) {
            return res.json(result);
        }
        throw new AppError('Erro ao listar sub-categoria', 400);
    }
    async update(req, res, next) {
        let result = await prodService.update(req, res, next);
        if (result) {
            return res.json(result);
        }
        throw new AppError('Erro ao criar produtos', 400);
    }
    async listUnic(req, res, next) {
        let result = await prodService.listUnic(req, res, next);
        if (result) {
            return res.json(result);
        }

        throw new AppError('Erro ao listar produto', 400);
    }
    async delete(req, res, next) {
        let result = await prodService.delete(req, res, next);
        if (result) {
            return res.json(result);
        }
        throw new AppError('Erro ao criar produtos', 400);
    }
}


module.exports = ProductController;