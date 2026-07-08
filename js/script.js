document.addEventListener("DOMContentLoaded", () => {
    // Se estiver na página Index (contém botões de adicionar)
    if (document.querySelector('.btn')) {
        const botoes = document.querySelectorAll('.btn');
        botoes.forEach(botao => {
            botao.addEventListener('click', (e) => {
                const nome = e.target.getAttribute('data-name');
                const preco = parseFloat(e.target.getAttribute('data-price'));
                const img = e.target.getAttribute('data-img');
                adicionarAoCarrinho(nome, preco, img);
            });
        });
    }

    // Se estiver na página Carrinho (contém a tabela do carrinho)
    if (document.getElementById('corpo-carrinho')) {
        exibirCarrinho();
        
        const btnFinalizar = document.getElementById('btn-finalizar');
        if (btnFinalizar) {
           btnFinalizar.addEventListener('click', () => {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }

    // Redireciona para a página de pagamento
    window.location.href = "../paginas/pagamentos.html";
}); 
        }
    }
});

function adicionarAoCarrinho(nome, preco, img) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const itemExistente = carrinho.find(item => item.nome === nome);

    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        carrinho.push({ nome, preco, img, quantidade: 1 });
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    alert(`${nome} adicionado ao carrinho!`);
}

function exibirCarrinho() {
    const corpoCarrinho = document.getElementById('corpo-carrinho');
    const totalElemento = document.getElementById('total-carrinho');
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    corpoCarrinho.innerHTML = '';
    let totalGeral = 0;

    if (carrinho.length === 0) {
        corpoCarrinho.innerHTML = `<tr><td colspan="5">Seu carrinho está vazio.</td></tr>`;
        totalElemento.innerHTML = '<strong>Total: R$ 0,00</strong>';
        return;
    }

    carrinho.forEach((item, index) => {
        const subtotal = item.preco * item.quantidade;
        totalGeral += subtotal;

        // Ajusta o caminho da imagem se estiver dentro da pasta 'paginas'
        const caminhoImg = item.img.startsWith('../') ? item.img : '../' + item.img;

        corpoCarrinho.innerHTML += `
            <tr>
                <td><img src="${caminhiMmgValido(caminhoImg)}" alt="${item.nome}" style="width:80px;"></td>
                <td>${item.nome}</td>
                <td>
                    <button class="btn-qtd" onclick="alterarQuantidade(${index}, -1)">-</button>
                    <span>${item.quantidade}</span>
                    <button class="btn-qtd" onclick="alterarQuantidade(${index}, 1)">+</button>
                </td>
                <td>R$ ${item.preco.toFixed(2).replace('.', ',')}</td>
                <td>R$ ${subtotal.toFixed(2).replace('.', ',')}</td>
            </tr>
        `;
    });

    totalElemento.innerHTML = `<strong>Total: R$ ${totalGeral.toFixed(2).replace('.', ',')}</strong>`;
}

// Força o caminho correto da imagem independente de onde o item foi adicionado
function caminhiMmgValido(url) {
    return url.replace('paginas/imagens/', 'imagens/').replace('//imagens', '/imagens');
}

window.alterarQuantidade = function(index, mudanca) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    
    carrinho[index].quantidade += mudanca;

    if (carrinho[index].quantidade <= 0) {
        carrinho.splice(index, 1);
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    exibirCarrinho();
};
document.addEventListener("DOMContentLoaded", () => {

    const lista = document.getElementById("lista-pagamento");
    const total = document.getElementById("valor-total");

    if (!lista || !total) return;

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    let totalGeral = 0;

    carrinho.forEach(item => {

        let subtotal = item.preco * item.quantidade;
        totalGeral += subtotal;

        lista.innerHTML += `
            <tr>
                <td>${item.nome}</td>
                <td>${item.quantidade}</td>
                <td>R$ ${subtotal.toFixed(2).replace(".", ",")}</td>
            </tr>
        `;
    });

    total.innerHTML = `<strong>Total: R$ ${totalGeral.toFixed(2).replace(".", ",")}</strong>`;
});