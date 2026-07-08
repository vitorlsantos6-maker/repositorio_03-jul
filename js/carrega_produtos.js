import { produtos } from "./produtos.js";

const lista = document.getElementById("lista-produtos");

produtos.forEach(produto => {

    const card = document.createElement("div");
    card.className = "produto";

    card.innerHTML = `
        <img src="${produto.caminho_da_imagem}" alt="${produto.descricao_produto}">

        <h3>${produto.descricao_produto}</h3>

        <p>${produto.nome_secao}</p>

        <div class="preco">
            ${produto.valor_unitario.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            })}
        </div>

        <button
            class="btn"
            data-name="${produto.descricao_produto}"
            data-price="${produto.valor_unitario}"
            data-img="${produto.caminho_da_imagem}">
            Adicionar ao Carrinho
        </button>
    `;

    lista.appendChild(card);

});