import Categoria from '../Models/Categoria.js';

async function index(req, res) {
  try {
    const categorias = await Categoria.getAllCategories();
    return res.json(categorias);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Erro ao buscar categoria" });
  }
}

async function store(req, res) {
  try {
    const categoria = req.body;

    await Categoria.createCategory(categoria);
    res.status(201).json({ message: "Categoria cadastrado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar categoria" });
  }
}

async function update(req, res) {
  try {
  const {id} = req.params;
  const categoria = req.body;

  await Categoria.updateCategory(id, categoria)
  res.status(201).json({ message: "Categoria atualizado com sucesso!"})
  } catch (error) {
    res.json({ error: "Erro ao atualizar categoria!"})
  }
}

async function remove(req, res) {
  try {
    const {id} = req.params;

    await Categoria.deleteCategory(id)
  res.status(200).json({ message: "Categoria deletado com sucesso!"})
  } catch (error) {
    res.json({ error: "Erro ao deletar categoria!"})
  }
}

export default { index, store, update, remove };