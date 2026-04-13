import CategoryService from '../services/CategoryService.js';

class CategoryController{
  async index(req, res, next) {
  try {
    const categorias = await CategoryService.listar();
    res.json(categorias);
  } catch (error) {
    next(error)
  }
}

async store(req, res, next) {
  try {

    await CategoryService.criarCategoria(req.body);
    res.status(201).json({ message: "Categoria cadastrado com sucesso!" });
  } catch (error) {
    next(error)
  }
}

async update(req, res, next) {
  try {
  const {id} = req.params;

  await CategoryService.atualizarCategoria(id, req.body)
  res.status(201).json({ message: "Categoria atualizado com sucesso!"})
  } catch (error) {
    next(error)
  }
}

async remove(req, res, next) {
  try {
    const {id} = req.params;

    await CategoryService.removerCategoria(id)
  res.status(200).json({ message: "Categoria deletado com sucesso!"})
  } catch (error) {
    next(error)
  }
}
}


export default new CategoryController();