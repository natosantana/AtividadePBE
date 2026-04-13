export function validarCamposObrigatorios(produto) {
  const camposObrigatorios = ["nome", "preco", "descricao"];
  const camposFaltando = [];


camposObrigatorios.forEach((campo) => {
  if (
    produto[campo] === undefined ||
    produto[campo] === null ||
    produto[campo].toString().trim() === ""
  ) {
    //.trim() -> Serve para remover espaços
    camposFaltando.push(campo);
  }
});

if (camposFaltando.length > 0) {
  //.join() -> É utilizado para juntar, transformar todos os elemento do array
  // em uma única string!
  // const frutas = ["Maça", "Banana", "Uva"];
  // console.log(frutas.join()) -> Maçã, Banana, Uva
  throw new Error(
    `Campos obrigatorios não preenchidos: ${camposFaltando.join(", ")}`,
  );
}
}
export function validarPreco(produto) {
  // typeof Determina o tipo do dado
  if (typeof produto.preco !== "number" || produto.preco <= 0) {
    throw new Error("Preço deve ser um numero maior que zero!");
  }
}

export function validarEstoque(produto){
    if(produto.estoque === null || produto.estoque < 0 ) {
        throw new Error("Estoque não pode ser negativo!")
    }
}

