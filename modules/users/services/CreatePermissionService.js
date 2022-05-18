const knex = require('../../../knex');
const AppError = require('../../../shared/erros/AppError');
class PermissaoUserService {

    async create(req, res, next) {
        const id = req.params.id
        const { permissao } = req.body;
        let selections = [
            'users.id', 'users.nome', 'users.email', 'senha', 'permissoes.nome_permissao'
        ]
        var user = await knex('users').select(selections)
            .leftJoin('usuarios_permissoes', 'users.id', 'usuarios_permissoes.user_id')
            .join('permissoes', 'permissoes.id', 'usuarios_permissoes.permissao_id')
            .where('users.id', id)
        user = {
            id: user[0].id,
            nome: user[0].nome,
            email: user[0].email,
            senha: user[0].senha,
            nome_permissao: user.map(user => user.nome_permissao)

        }

        if (!user) {
            throw new AppError('Usuario não encondtrado', 404);
        }

        const permissoes = await knex.select('*').from('permissoes')

        let users_ids = permissoes.filter(Fpermisao => {
            return permissao.filter(permissao => permissao.nome.toLowerCase()
                == Fpermisao.nome_permissao.toLowerCase()).length > 0
        });

        let permissao_usuario = [];

        users_ids.forEach(item => {
            permissao_usuario.push(
                {
                    user_id: user.id,
                    permissao_id: item.id
                }
            )
        });

        let index;


        // if (user.nome_permissao && user.nome_permissao.length > 0) {
        //     users_ids = users_ids.map((uI, i) => {
        //         user.nome_permissao.map(use => {

        //             if (use == uI.nome_permissao) {
        //                 console.log(uI)
        //                 return users_ids;
        //             }
        //         })
        //     })
        // }


        let criado = await knex('usuarios_permissoes').insert(permissao_usuario);
        if (criado) {
            return true
        }
        AppError('Erro ao criar permissão', 500);
    }

    async list(req, res, nex) {
        let selections = [
            'users.id', 'users.nome', 'users.email', 'senha', 'permissoes.nome_permissao'
        ]
        var users = await knex('users').select(selections)
            .leftJoin('usuarios_permissoes', 'users.id', 'usuarios_permissoes.user_id')
            .join('permissoes', 'permissoes.id', 'usuarios_permissoes.permissao_id');
        return users
    }
}
module.exports = PermissaoUserService;