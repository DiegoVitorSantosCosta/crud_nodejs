
const CreateCat_SubCat_ProdService = require('../services/CreateCat-SubCat-ProdService');
const AppError = require('../../../shared/erros/AppError');
const createService = new CreateCat_SubCat_ProdService();

class NinchoDeCat_SubCat_Prod_Controller {
    async create(req, res, next) {
        let result = await createService.create(req, res, next);
        if (result) {
            return res.json(result);
        }
        throw new AppError('Erro ao criar produtos', 400);

    }

    async index(req, res, next) {
        let result = await createService.index(req, res, next);
        if (result) {
            return res.json(result);
        }
        throw new AppError('Erro ao criar produtos', 400);
    }
    async update(req, res, next) {
        let result = await createService.update(req, res, next);
        if (result) {
            return res.json(result);
        }
        throw new AppError('Erro ao criar produtos', 400);
    }
    async listUnic(req, res, next) {
        let result = await createService.listUnic(req, res, next);
        if (result) {
            return res.json(result);
        }

        throw new AppError('Erro ao criar produtos', 400);
    }
    async delete(req, res, next) {
        let result = await createService.delete(req, res, next);
        if (result) {
            return res.json(result);
        }
        throw new AppError('Erro ao criar produtos', 400);
    }
}


module.exports = NinchoDeCat_SubCat_Prod_Controller;