const knex = require('../../../knex');
const AppError = require('../../../shared/erros/AppError');

class CreateUserService {
    async execute(request, response) {
        const users = await knex('users').select('email').where('email', request.body.email);
        if (users.length > 0) {
            throw new AppError('Usuario ja existe', 400);
        }

        await knex('users').insert({
            nome: request.body.nome,
            email: request.body.email,
            senha: request.body.senha
        }).select('*');

        return true;



    }

    async list(request, response) {
        let selections = [
            'users.id', 'users.nome', 'users.email', 'senha', 'permissoes.nome_permissao'
        ]
        var users = await knex('users').select(selections)
            .leftJoin('usuarios_permissoes', 'users.id', 'usuarios_permissoes.user_id')
            .leftJoin('permissoes', 'permissoes.id', 'usuarios_permissoes.permissao_id');

        let a;
        let arr = [];
        // for (let i = 1; i < users.length; i++) {
        //     a = users.filter((user, fi) => {

        //         if (users[i].id == user.id) {
        //             if (user.nome_permissao && users[i].nome_permissao) {

        //                 arr.push(user.nome_permissao)
        //                 users[i].nome_permissao.push(user.nome_permissao)
        //             } else if (!user.nome_permissao && users[i].nome_permissao) {
        //                 return users[i].nome_permissao;
        //             } else if (user.nome_permissao && !users[i].nome_permissao) {
        //                 return user.nome_permissao;
        //             }
        //             if (users === undefined) {
        //                 return user.nome_permissao
        //             }

        //         }
        //     })

        // }

        return response.json(users);
    }
}
module.exports = CreateUserService;