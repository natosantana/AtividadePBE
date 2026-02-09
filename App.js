import express from 'express'
import ProdutosRoutes from './Routes/ProdutosRoutes.js'
import CategoriasRoutes from './Routes/CategoriasRoutes.js'

const app = express();
app.use(express.json());

// http://localhost:3000/produtos
app.use("/produtos", ProdutosRoutes);
app.use("/categorias", CategoriasRoutes)

export default app;