const knex = require('../../../knex');
const AppError = require('../../../shared/erros/AppError');
class CreateCat_SubCat_ProdService {
    async create(req, res, next) {
        let { categoria, subCategorias, produtos } = req.body;

        let subCategoriaId = null;
        let categoriaId = null;
        let productArrayDoFormularioFinal = [];
        let todasImagensVindoDoForm = [];
        let novoArrayParaInserirImagem = [];


        if (!categoria?.id) {
            let categoriaBanco = await knex.select('*').from('categorias').where('nome_categoria', categoria.nome); // talvez devemos tratar o nome com toLoweCase
            if (categoriaBanco.length > 0) {
                throw new AppError('Categoria já existe', 400);
            }
            categoriaId = await knex('categorias').insert({ nome_categoria: categoria.nome });
        } else {
            categoriaId = await knex('categorias').where('id', categoria.id);
        }

        if (!subCategorias?.id) {
            let subCategoriaBanco = await knex.select('*').from('sub_categorias').where('nome_subcategoria', subCategorias.nome);
            if (subCategoriaBanco.length > 0) {
                throw new AppError('Subcategoria já existe', 400);
            }
            subCategoriaId = await knex('sub_categorias').insert({ nome_subcategoria: subCategorias.nome });

        } else {
            subCategoriaId = await knex('sub_categorias').where('id', subCategorias.id);
        }

        produtos.forEach((produto, i) => {
            todasImagensVindoDoForm[i] = produto?.imagens?.filter((imagem, j) => {
                return imagem
            })
            productArrayDoFormularioFinal.push({
                nome_produto: produto.nome_produto, descricao: produto.descricao,
                preco: produto.preco, quantidade: produto.quantidade
            });
        });
        console.log(produtos)
        return;

        let produtoId = await knex('produtos').insert(productArrayDoFormularioFinal).returning('id')
        let allProducts = await knex('produtos').whereBetween('id', [produtoId[0], productArrayDoFormularioFinal.length + produtoId[0]]);

        allProducts.map((produto, inceDoProduto) => {
            todasImagensVindoDoForm[inceDoProduto]?.forEach((imagem) => {
                novoArrayParaInserirImagem.push({
                    prod_id: produto.id, url_img: imagem.url_imagem
                });
            });

        });
        await knex('imagem_produtos').insert(novoArrayParaInserirImagem);
        let arrayDeIdsCat_SubCat_Prod = [];
        allProducts.forEach((produto, i) => {
            arrayDeIdsCat_SubCat_Prod.push({
                cat_id: categoriaId[0].id, sub_cat_id: subCategoriaId[0].id, prod_id: produto.id
            });
        });

        let sucess = await knex('cat_sub_cat_prod').insert(arrayDeIdsCat_SubCat_Prod);

        if (sucess.length > 0) {
            return res.json({ message: 'Produto criado com sucesso' });
        }
        throw new AppError('Erro ao criar produtos', 400);

    }
    async index(req, res, next) {
        let selections = ['produtos.id', 'produtos.nome_produto', 'produtos.descricao', 'produtos.preco',
            'produtos.quantidade', 'produtos.created_at', 'produtos.updated_at', 'cat.id as cat_id',
            'cat.nome_categoria as nomeCategoria', 'sc.id as subCat_id', 'sc.nome_subcategoria'];

        let result = await knex.select(selections).from('produtos')
            .leftJoin('cat_sub_cat_prod', 'produtos.id', 'cat_sub_cat_prod.prod_id')
            .join('categorias as cat', 'cat.id', 'cat_sub_cat_prod.cat_id')
            .join('sub_categorias as sc', 'sc.id', 'cat_sub_cat_prod.sub_cat_id')
            .orderBy('produtos.id', 'asc');

        let imagens = await knex.select('*').from('imagem_produtos').whereIn('prod_id', result.map(produto => produto.id));

        result.forEach((produto, i) => {
            result[i].imagens = imagens.filter(imagem => imagem.prod_id === produto.id);
        });

        if (result.length > 0) {
            return res.json(result);
        }
    }
    async update(req, res, next) {
        let { categoria, subCategorias, produtos } = req.body;
        let { id } = req.params;
        // let categoriaBanco = await knex.select('*').from('categorias').where('id', id).first();
        // if (categoriaBanco && categoriaBanco.nome_categoria !== categoria.nome) {
        //     await knex('categorias').where('id', id).update({ nome_categoria: categoria.nome });

        // }
        // let subCategoriaBanco = await knex.select('*').from('sub_categorias').where('id', id).first();
        // if (subCategoriaBanco && subCategoriaBanco.nome_subcategoria !== subCategorias.nome) {
        //     await knex('sub_categorias').where('id', id).update({ nome_subcategoria: subCategorias.nome });
        // }

        let produtoBanco = await knex.select('*').from('produtos').where('id', id).first();
        await knex('produtos').where('id', id).update({ nome_produto: produtos.nome_produto });

        return res.json({ message: 'Produto atualizado com sucesso' });

    }

    async listUnic(req, res, next) {
        let { id } = req.params;
        let selections = ['produtos.id', 'produtos.nome_produto', 'produtos.descricao', 'produtos.preco',
            'produtos.quantidade', 'produtos.created_at', 'produtos.updated_at', 'cat.id as cat_id',
            'cat.nome_categoria as nomeCategoria', 'sc.id as subCat_id', 'sc.nome_subcategoria'];

        let result = await knex.select(selections).from('produtos')
            .leftJoin('cat_sub_cat_prod', 'produtos.id', 'cat_sub_cat_prod.prod_id')
            .join('categorias as cat', 'cat.id', 'cat_sub_cat_prod.cat_id')
            .join('sub_categorias as sc', 'sc.id', 'cat_sub_cat_prod.sub_cat_id').where('produtos.id', id)
            .orderBy('produtos.id', 'asc').first();

        if (result) {
            return res.json(result);
        }
        throw new AppError('Produto não encontrado', 404);
    }
    async delete(req, res, next) {
        let { id } = req.params;
        let produtoBanco = await knex.select('*').from('produtos').where('id', id).first();
        if (produtoBanco) {
            await knex('produtos').where('id', id).del();
            return res.json({ message: 'Produto deletado com sucesso' });
        }
        throw new AppError('Produto não encontrado', 404);
    }


}

module.exports = CreateCat_SubCat_ProdService;