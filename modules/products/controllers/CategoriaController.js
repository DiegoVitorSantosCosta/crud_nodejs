const CatService = require('../services/CategoryService');
const AppError = require('../../../shared/erros/AppError');
const catService = new CatService();
class CategoriaController {
    async create(req, res, next) {
        let result = await catService.create(req, res, next);
        if (result) {
            return res.json(result);
        }
        throw new AppError('Erro ao criar categoria', 400);

    }

    async index(req, res, next) {
        let result = await catService.index(req, res, next);
        if (result) {
            return res.json(result);
        }
        throw new AppError('Erro ao listar sub-categoria', 400);
    }
    async update(req, res, next) {
        let result = await catService.update(req, res, next);
        if (result) {
            return res.json(result);
        }
        throw new AppError('Erro ao criar produtos', 400);
    }
    async listUnic(req, res, next) {
        let result = await catService.listUnic(req, res, next);
        if (result) {
            return res.json(result);
        }

        throw new AppError('Erro ao listar produto', 400);
    }
    async delete(req, res, next) {
        let result = await catService.delete(req, res, next);
        if (result) {
            return res.json(result);
        }
        throw new AppError('Erro ao criar produtos', 400);
    }
}
module.exports = CategoriaController;