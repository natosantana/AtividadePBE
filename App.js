import express from 'express'
import cors from 'cors'
import ProdutosRoutes from './Routes/product.routes.js'
import CategoriasRoutes from './Routes/category.routes.js'

const app = express();

app.use(cors())
app.use(express.json());

// http://localhost:3000/produtos
app.use("/produtos", ProdutosRoutes);
app.use("/categorias", CategoriasRoutes)

export default app;