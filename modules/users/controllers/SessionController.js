const SessionService = require('../services/SessionService');
const knex = require('../../../knex');
class SessionController {
    async create(request, response) {
        const sessionService = new SessionService();
        let users = await sessionService.execute(request, response);

        return response.json(users);
    }

}
module.exports = SessionController;