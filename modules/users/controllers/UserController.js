const CreateUserService = require('../services/CreateUserService');
class UserController {
    async execute(request, response) {
        const userService = new CreateUserService();
        const users = await userService.execute(request, response);

        if (users) {
            response.json({ mensagem: 'Usuario criado com sucesso' });
        }

    }

    async list(request, response) {
        const userService = new CreateUserService();
        const users = await userService.list(request, response);
    }

}
module.exports = UserController;