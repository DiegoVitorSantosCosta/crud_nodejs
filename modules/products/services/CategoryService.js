const knex = require('../../../knex');
const AppError = require('../../../shared/erros/AppError');

class CategoryService {

    async create(req, res, nex) {
        let { nome } = req.body.categoria

        let result = await knex('categorias').insert({ nome_categoria: nome });
        console.log(result);
        if (result) {
            return res.json(result);
        }

    }
    async index(req, res, next) {


        let result = await knex.select('*').from('categorias');

        if (result.length > 0) {
            return res.json(result);
        }
    }
    async update(req, res, next) {
        let { id } = req.params;
        let { nome_categoria } = req.body;

        let result = await knex('categorias').where({ id }).update({ nome_categoria });
        if (result) {
            return res.json(result);
        }
    }
    async filtrarTudoPeloIdDaCategoria(req, res, next) {
        let { id } = req.params;

        let query = `SELECT p.id as produc_id, p.nome_produto ,p.preco ,p.quantidade ,p.descricao,
         c.id as 'id_cat',  c.nome_categoria, 
         sc.id as 'id_sub_cat',  sc.nome_subcategoria from 
        produtos as p
        inner join cat_sub_cat_prod as cscp on cscp.cat_id = ${id} and p.id = cscp.prod_id
         join categorias as c on c.id = ${id}
          join sub_categorias as sc on sc.id = cscp.sub_cat_id`

        let result = await knex.raw(query).then(function (resp) {
            return resp[0];
        });
        // let result = await knex.select(selections).from('produtos as p')
        //     .innerJoin('cat_sub_cat_prod as cscp', 'cscp.cat_id', id)
        //     .innerJoin('categorias as c', 'c.id', id)
        // innerJoin('sub_categorias as sc', 'sc.id', '=', 'cscp.sub_cat_id')
        return res.json(result);
    }

}
module.exports = CategoryService