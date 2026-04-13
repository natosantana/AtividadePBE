import CategoryModel from "../Models/CategoryModel.js";
import CategoryRepository from "../repositories/CategoryRepository.js";
import ProductRepository from "../repositories/ProductRepository.js";

class CategoryService {
  async listar() {
    return await CategoryRepository.getAllCategories();
  }

  async criarCategoria(data) {

    // getById (idCorreto)
    // Vai me retornar todas as informações da categoria!
    let categoria = await CategoryRepository.getById(data.categoria_id);

    if (!categoria) {
      throw new Error("Categoria não existe!");
    }

    if (categoria.status === 0) {

    }

    // Model -> Cuida da estrutura dos dados
    const produto = new CategoryModel(data);

    // Repository -> Cuida do banco (INSERT, UPDATE, SELECT)
    return await CategoryRepository.createCategory(data);
  }

  async atualizarCategoria(id, data) {
    if (!id) {
      throw new Error("ID do categoria é obrigatório");
    }

    console.log(typeof id)
    const categoriaAtual = await CategoryRepository.getById(id);

    if (!categoriaAtual) {
      throw new Error("Categoria não encontrado!");
    }

    if (data.categoria_id) {
      const categoria = await CategoryRepository.getById(data.categoria_id);

      if (!categoria || categoria.status === 0) {
        throw new Error("Categoria inválida ou desativada!");
      }
    }


    
    // Model -> Cuida da estrutura dos dados
    const categoria = new CategoryModel(data);

    // Repository -> Cuida do banco (INSERT, UPDATE, SELECT)
    return await CategoryRepository.updateCategory(id, categoria);
  }

  async removerCategoria(id) {
const totalProdutos = await ProductRepository.countByCategoria(id)
   
   if(totalProdutos > 0 ){
    throw new Error("Não é possivel excluir categoria com produtos vinculados")
   }

   return await CategoryRepository.deleteCategory(id)
  }

  async desativar(id) {
    if (!id || isNan(id)) {
      throw new Error("ID da categoria é obrigatorio");
    }

    // Verificando se a categoria existe
    const categoria = CategoryRepository.getById(id);

    if (!categoria) {
      throw new Error("Categoria não encontrada!");
    }

    // Desativando a categoria encontrada!
    await CategoryRepository.updateStatus(id, 0);

    // Desativando produtos por categoria
    await ProductModel.desativarPorCategoria(id);

    return { message: "Categoria e produtos desativados com sucesso!"}
  }
}

export default new CategoryService()