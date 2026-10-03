const vendas = {
  "vendas": [
    { "vendedor": "João Silva", "valor": 1200.50 },
    { "vendedor": "João Silva", "valor": 950.75 },
    { "vendedor": "João Silva", "valor": 1800.00 },
    { "vendedor": "João Silva", "valor": 1400.30 },
    { "vendedor": "João Silva", "valor": 1100.90 },
    { "vendedor": "João Silva", "valor": 1550.00 },
    { "vendedor": "João Silva", "valor": 1700.80 },
    { "vendedor": "João Silva", "valor": 250.30 },
    { "vendedor": "João Silva", "valor": 480.75 },
    { "vendedor": "João Silva", "valor": 320.40 },

    { "vendedor": "Maria Souza", "valor": 2100.40 },
    { "vendedor": "Maria Souza", "valor": 1350.60 },
    { "vendedor": "Maria Souza", "valor": 950.20 },
    { "vendedor": "Maria Souza", "valor": 1600.75 },
    { "vendedor": "Maria Souza", "valor": 1750.00 },
    { "vendedor": "Maria Souza", "valor": 1450.90 },
    { "vendedor": "Maria Souza", "valor": 400.50 },
    { "vendedor": "Maria Souza", "valor": 180.20 },
    { "vendedor": "Maria Souza", "valor": 90.75 },

    { "vendedor": "Carlos Oliveira", "valor": 800.50 },
    { "vendedor": "Carlos Oliveira", "valor": 1200.00 },
    { "vendedor": "Carlos Oliveira", "valor": 1950.30 },
    { "vendedor": "Carlos Oliveira", "valor": 1750.80 },
    { "vendedor": "Carlos Oliveira", "valor": 1300.60 },
    { "vendedor": "Carlos Oliveira", "valor": 300.40 },
    { "vendedor": "Carlos Oliveira", "valor": 500.00 },
    { "vendedor": "Carlos Oliveira", "valor": 125.75 },

    { "vendedor": "Ana Lima", "valor": 1000.00 },
    { "vendedor": "Ana Lima", "valor": 1100.50 },
    { "vendedor": "Ana Lima", "valor": 1250.75 },
    { "vendedor": "Ana Lima", "valor": 1400.20 },
    { "vendedor": "Ana Lima", "valor": 1550.90 },
    { "vendedor": "Ana Lima", "valor": 1650.00 },
    { "vendedor": "Ana Lima", "valor": 75.30 },
    { "vendedor": "Ana Lima", "valor": 420.90 },
    { "vendedor": "Ana Lima", "valor": 315.40 }
  ]
};

const estoque = {
  "estoque": [
    {
      "codigoProduto": 101,
      "descricaoProduto": "Caneta Azul",
      "estoque": 150
    },
    {
      "codigoProduto": 102,
      "descricaoProduto": "Caderno Universitário",
      "estoque": 75
    },
    {
      "codigoProduto": 103,
      "descricaoProduto": "Borracha Branca",
      "estoque": 200
    },
    {
      "codigoProduto": 104,
      "descricaoProduto": "Lápis Preto HB",
      "estoque": 320
    },
    {
      "codigoProduto": 105,
      "descricaoProduto": "Marcador de Texto Amarelo",
      "estoque": 90
    }
  ]
}


function calculaComissao(valor) {
  if (valor <= 0) throw new Error("Valor de venda não pode ser zero ou negativo");
  if (valor >= 500) return Number((valor * 0.05).toFixed(2));
  if (valor >= 100) return Number((valor * 0.01).toFixed(2));
  return 0;
}

function calcularComissoes() {
  const comissoes = {};
  for (const v of vendas.vendas) {
    comissoes[v.vendedor] = comissoes[v.vendedor] + calculaComissao(v.valor);
  }

  console.log("Commissões:")
  console.log(comissoes);
}

function movimentacaoDeEstoque(codigo, tipo, quantidade) {
  const item = estoque.estoque.find(i => i.codigoProduto === codigo);
  if (!item) {
    console.log("Produto não encontrado");
    return;
  }
  if (isNaN(quantidade) || quantidade <= 0) {
    console.log("Quantidade inválida");
    return;
  }
  if (typeof tipo !== 'string') {
    console.log("Operações só podem ser 'ENTRADA' ou 'SAIDA'");
    return;
  }
  tipo = tipo.toUpperCase();

  if (tipo === "ENTRADA") {
    item.estoque += quantidade;
  } else if (tipo === "SAIDA") {
    if (item.estoque < quantidade) {
      console.log("Estoque insuficiente");
      return;
    }
    item.estoque -= quantidade;
  } else {
    console.log("Operações só podem ser 'ENTRADA' ou 'SAIDA'");
    return;
  }

  console.log(`Novo estoque: ${item.estoque}`);
}


function calcularJurosDeAtraso(valor, vencimento) {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  vencimento = new Date(vencimento);
  if (!(vencimento instanceof Date)) {
    console.log("Data de vencimento inválida");
  }
  vencimento.setHours(0, 0, 0, 0);

  if (hoje < vencimento) {
    console.log("A nota não venceu ainda");
  } else {
    const prazo = Math.ceil((hoje - vencimento) / (1000 * 60 * 60 * 24));

    const jurosPorDia = valor * 0.025;
    const total = (prazo * jurosPorDia).toFixed(2);

    console.log(`Juros: R$ ${total}`);
  }
}
