import env from "./Config/env.js";
import app from "./App.js";

app.listen(env.port, () => {
  console.log(`Servidor rodando na porta ${env.port}`);
});
