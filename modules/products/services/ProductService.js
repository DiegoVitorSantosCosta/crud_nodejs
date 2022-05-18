const knex = require('../../../knex');
const AppError = require('../../../shared/erros/AppError');
class ProductService {

    async delete(req, res, next) {
        let { id } = req.params;
        console.log(id);
        let sucess = await knex('produtos').delete().where({ id });

        if (sucess) {
            return res.json({ message: 'Produto deletado com sucesso' });
        }
        throw new AppError('Erro ao deletar produto', 400);
    }
    async update(req, res, next) {
        let { id } = req.params;
        let { nome_produto, descricao, preco, quantidade } = req.body;
        let sucess = await knex('produtos').update({ nome_produto, descricao, preco, quantidade }).where({ id });

        if (sucess) {
            return res.json({ message: 'Produto atualizado com sucesso' });
        }
        throw new AppError('Erro ao atualizar produto', 400);
    }

}
module.exports = ProductService