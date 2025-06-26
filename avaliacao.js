let prompt = require('prompt-sync')();
//adicionando as variaveis principais
let produtos = ['salgado', 'assado', 'bolo', 'refrigerante', 'biscoito', 'suco'];
let quantidades = [];
const limite = 5;

//cadastrando a quantidade de produtos
for (let i = 0; i < produtos.length; i++) {
  let quantidade;
  do {
    quantidade = prompt(`Digite a quantidade inicial de "${produtos[i]}": `);

    if (isNaN(quantidade) || quantidade.trim() === "") {
      console.log("Entrada inválida. Digite um número inteiro.");
    } else {
      quantidade = parseInt(quantidade);
      if (quantidade < 0) {
        console.log("A quantidade não pode ser negativa.");
      }
    }

  } while (isNaN(quantidade) || quantidade < 0);

  quantidades[i] = quantidade;
}

console.log("Quantidade inicial da cantina:");
for (let i = 0; i < produtos.length; i++) {
  console.log(`${produtos[i]}: ${quantidades[i]}`);

  if (quantidades[i] < limite) {
    console.log(`Atenção! ${produtos[i]} está com estoque baixo (${quantidades[i]} unidades).`);
  }
}
//adicionando o menu 
let menu;

do {
  console.log("\nMENU DA CANTINA");
  console.log("1 - Ver produtos e estoques");
  console.log("2 - Registrar venda");
  console.log("3 - Repor estoque");
  console.log("4 - Encerrar sistema");
  menu = prompt("Digite o número da opção: ");

  //escolha da opcao desejada
  switch (menu) {
    case "1":
      console.log("\nEstoque atual:");
      for (let i = 0; i < produtos.length; i++) {
        console.log(`${produtos[i]}: ${quantidades[i]}`);
      }
      break;

    case "2":
      console.log("\nRegistrar venda");
      let produtoVenda = prompt("Digite o nome do produto vendido: ").toLowerCase();
      let indexVenda = produtos.indexOf(produtoVenda);
      if (indexVenda !== -1) {
        let qtdVenda;
        do {
          qtdVenda = prompt("Digite a quantidade vendida: ");
          if (isNaN(qtdVenda) || qtdVenda.trim() === "") {
            console.log("Entrada inválida. Digite um número.");
          } else {
            qtdVenda = parseInt(qtdVenda);
            if (qtdVenda < 0) {
              console.log("A quantidade não pode ser negativa.");
            }
          }
        } while (isNaN(qtdVenda) || qtdVenda < 0);

        if (quantidades[indexVenda] >= qtdVenda) {
          quantidades[indexVenda] -= qtdVenda;
          console.log(`Venda registrada com sucesso! Novo estoque de ${produtoVenda}: ${quantidades[indexVenda]}`);
          if (quantidades[indexVenda] < limite) {
            console.log(`Atenção! Estoque de ${produtoVenda} está abaixo do limite crítico!`);
          }
        } else {
          console.log("Estoque insuficiente para essa venda.");
        }
      } else {
        console.log("Produto não encontrado.");
      }
      break;

    case "3":
      console.log("\nRepor estoque");
      let produtoRepor = prompt("Digite o nome do produto a repor: ").toLowerCase();
      let indexRepor = produtos.indexOf(produtoRepor);
      if (indexRepor !== -1) {
        let qtdRepor;
        do {
          qtdRepor = prompt("Digite a quantidade a adicionar: ");
          if (isNaN(qtdRepor) || qtdRepor.trim() === "") {
            console.log("Entrada inválida. Digite um número.");
          } else {
            qtdRepor = parseInt(qtdRepor);
            if (qtdRepor < 0) {
              console.log("A quantidade não pode ser negativa.");
            }
          }
        } while (isNaN(qtdRepor) || qtdRepor < 0);

        quantidades[indexRepor] += qtdRepor;
        console.log(`Estoque de ${produtoRepor} atualizado: ${quantidades[indexRepor]}`);
      } else {
        console.log("Produto não encontrado.");
      }
      break;
//encerrando o sistema
    case "4":
      console.log("\nSistema encerrado.");
      break;

    default:
      console.log("Opção inválida. Tente novamente.");
  }

} while (menu !== "4");
