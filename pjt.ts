type Item = {
  nome: string;
  quantidade: number;
  categoria: string;
  comprado: boolean;
};

let listaDeCompras: Item[] = [];

function adicionarItem(): void {
  const nome: string | null = prompt("Digite o nome do item:");
  const quantidade: string | null = prompt("Digite a quantidade:");
  const categoria: string | null = prompt("Digite a categoria:");

  if (nome && quantidade && categoria) {
    const novoItem: Item = {
      nome: nome,
      quantidade: parseInt(quantidade),
      categoria: categoria,
      comprado: false,
    };

    listaDeCompras.push(novoItem);
    console.log("Item adicionado:", novoItem);
  } else {
    alert("Todos os campos são obrigatórios.");
  }
}

function listarItens(ordenarPor: 'nome' | 'categoria' | 'quantidade' = 'nome', filtrarPorCategoria?: string, filtrarPorStatus?: boolean): void {
  let itensFiltrados: Item[] = [...listaDeCompras];

  if (filtrarPorCategoria) {
    itensFiltrados = itensFiltrados.filter(item => item.categoria === filtrarPorCategoria);
  }

  if (typeof filtrarPorStatus === 'boolean') {
    itensFiltrados = itensFiltrados.filter(item => item.comprado === filtrarPorStatus);
  }

  itensFiltrados.sort((a, b) => {
    if (ordenarPor === 'nome') {
      return a.nome.localeCompare(b.nome);
    } else if (ordenarPor === 'categoria') {
      return a.categoria.localeCompare(b.categoria);
    } else {
      return a.quantidade - b.quantidade;
    }
  });

  console.log('Lista de compras:');
  itensFiltrados.forEach(item => {
    console.log(`${item.nome} (${item.quantidade}) - ${item.categoria} - ${item.comprado ? 'Comprado' : 'Não comprado'}`);
  });
}

function buscarIndiceItem(nome: string): number {
  for (let i = 0; i < listaDeCompras.length; i++) {
    if (listaDeCompras[i].nome === nome) {
      return i;
    }
  }
  return -1; // Retorna -1 se o item não for encontrado
}

function editarItemDaLista(): void {
  const itemParaEditar: string | null = prompt("Digite o nome do item que deseja editar:");

  if (itemParaEditar) {
    const indiceDoItem: number = buscarIndiceItem(itemParaEditar);

    if (indiceDoItem !== -1) {
      const item: Item = listaDeCompras[indiceDoItem];

      const novoNome: string | null = prompt(`Novo nome para ${item.nome}: (deixe em branco para manter)`);
      const novaQuantidade: string | null = prompt(`Nova quantidade para ${item.nome}: (deixe em branco para manter)`);
      const novaCategoria: string | null = prompt(`Nova categoria para ${item.nome}: (deixe em branco para manter)`);

      if (novoNome) item.nome = novoNome;
      if (novaQuantidade) item.quantidade = parseInt(novaQuantidade);
      if (novaCategoria) item.categoria = novaCategoria;

      console.log("Item editado:", item);
    } else {
      alert("Item não encontrado na lista.");
    }
  }
}

function removerItemDaLista(): void {
  const itemParaRemover: string | null = prompt("Digite o nome do item que deseja remover:");

  if (itemParaRemover) {
    const indiceDoItem: number = buscarIndiceItem(itemParaRemover);

    if (indiceDoItem !== -1) {
      const confirmacao: boolean = confirm(`Tem certeza que deseja remover o item ${itemParaRemover}?`);

      if (confirmacao) {
        listaDeCompras.splice(indiceDoItem, 1);
        alert("Item removido!");
      } else {
        alert("Remoção cancelada.");
      }
    } else {
      alert("Item não encontrado na lista.");
    }
  }
}

function marcarItemComoComprado(): void {
  const itemParaMarcar: string | null = prompt("Digite o nome do item que deseja marcar como comprado:");

  if (itemParaMarcar) {
    const indiceDoItem: number = buscarIndiceItem(itemParaMarcar);

    if (indiceDoItem !== -1) {
      const item: Item = listaDeCompras[indiceDoItem];
      item.comprado = !item.comprado;
      console.log(`O item ${item.nome} foi marcado como ${item.comprado ? 'comprado' : 'não comprado'}.`);
    } else {
      alert("Item não encontrado na lista.");
    }
  }
}

function exibirListaDeCompras(): void {
  console.log("Lista de Compras:");
  listaDeCompras.forEach(item => {
    console.log(`${item.nome} (${item.quantidade}) - ${item.comprado ? '✅' : '❌'}`);
  });
}

function resumoLista(): void {
  const totalItens: number = listaDeCompras.length;
  const categorias: Record<string, number> = {};
  let comprados: number = 0;
  let naoComprados: number = 0;

  listaDeCompras.forEach(item => {
    categorias[item.categoria] = (categorias[item.categoria] || 0) + 1;
    item.comprado ? comprados++ : naoComprados++;
  });

  console.log(`Resumo da Lista de Compras:
  - Total de itens: ${totalItens}
  - Itens comprados: ${comprados}
  - Itens não comprados: ${naoComprados}`);

  console.log('Itens por categoria:');
  for (const categoria in categorias) {
    if (categorias.hasOwnProperty(categoria)) {
      console.log(`- ${categoria}: ${categorias[categoria]}`);
    }
  }
}

function mostrarMenu(): number {
  console.log("----- Gerenciador de Lista de Compras -----");
  console.log("1. Adicionar item");
  console.log("2. Listar itens");
  console.log("3. Editar item");
  console.log("4. Remover item");
  console.log("5. Marcar item como comprado");
  console.log("6. Exibir lista completa");
  console.log("7. Resumo da lista");
  console.log("0. Sair");
  console.log("----------------------------------------");

  const opcao: string | null = prompt("Digite o número da opção desejada:");
  return opcao ? parseInt(opcao) : 0;
}

function main(): void {
  let opcao: number;

  do {
    opcao = mostrarMenu();

    switch (opcao) {
      case 1:
        adicionarItem();
        break;
      case 2:
        listarItens();
        break;
      case 3:
        editarItemDaLista();
        break;
      case 4:
        removerItemDaLista();
        break;
      case 5:
        marcarItemComoComprado();
        break;
      case 6:
        exibirListaDeCompras();
        break;
      case 7:
        resumoLista();
        break;
      case 0:
        console.log("Saindo...");
        break;
      default:
        console.log("Opção inválida.");
    }
  } while (opcao !== 0);
}

main();
