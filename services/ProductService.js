import ProductModel from "../Models/ProductModel.js";
import ProductRepository from "../repositories/ProductRepository.js";
import CategoryRepository from "../repositories/CategoryRepository.js";
import CategoryModel from "../Models/CategoryModel.js";
import {
  validarCamposObrigatorios,
  validarPreco,
  validarEstoque,
} from "../validators/product.validator.js";

class ProductService {
  async listar() {
    return await ProductRepository.getALL();
  }

  async criarProduto(data) {
    validarCamposObrigatorios(data);
    validarPreco(data);
    validarEstoque(data);

    // getById (idCorreto)
    // Vai me retornar todas as informações da categoria!
    console.log(data.categoria_id)
    let categoria = await CategoryRepository.getById(data.categoria_id);

    if (!categoria) {
      throw new Error("Categoria não existe!");
    }

    if (categoria.status === 0) {
      throw new Error(
        "Não é possivel cadastrar produto em categoria desativada!",
      );
    }

    if (data.destaque) {
      const totalDestaques = await ProductRepository.countDestaques();

      if (totalDestaques >= 5) {
        throw new Error("Limite de destaques atingido");
      }
    }

    // Model -> Cuida da estrutura dos dados
    const produto = new ProductModel(data);

    // Repository -> Cuida do banco (INSERT, UPDATE, SELECT)
    return await ProductRepository.createProduct(data);
  }

  async atualizar(id, data) {
    if (!id) {
      throw new Error("ID do Produto é obrigatório");
    }

    console.log(typeof id)
    const produtoAtual = await ProductRepository.getById(id);

    if (!produtoAtual) {
      throw new Error("Produto não encontrado!");
    }

    if (data.categoria_id) {
      const categoria = await CategoryRepository.getById(data.categoria_id);

      if (!categoria || categoria.status === 0) {
        throw new Error("Categoria inválida ou desativada!");
      }
    }

    validarCamposObrigatorios(data);
    validarPreco(data);
    validarEstoque(data);

    if (data.destaque && !produtoAtual.destaque) {
      const totalDestaques = await ProductRepository.countDestaques();

      if (totalDestaques >= 5) {
        throw new Error("Limite de produtos em destaque foi atingido!");
      }
    }
    // Model -> Cuida da estrutura dos dados
    const produto = new ProductModel(data);

    // Repository -> Cuida do banco (INSERT, UPDATE, SELECT)
    return await ProductRepository.updateProduct(id, produto);
  }

  async deletar(id) {
    if (!id) {
      throw new Error("ID do Produto é obrigatório");
    }
    return await ProductRepository.deleteProduct(id);
  }
}

export default new ProductService();