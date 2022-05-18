const knex = require('../../../knex');
const AppError = require('../../../shared/erros/AppError');
const PermissaoUserService = require('../services/CreatePermissionService');

class PermissaoController {
    async create(request, response) {
        const permissaoUserS = new PermissaoUserService();
        let permissao = await permissaoUserS.create(request, response);

        return response.json(permissao);
    }
}

module.exports = PermissaoController;