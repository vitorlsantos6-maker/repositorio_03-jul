document.addEventListener("DOMContentLoaded", () => {
    const lista = document.getElementById("lista-pagamento");
    const total = document.getElementById("valor-total");
    const formPagamento = document.getElementById("form-pagamento");
    const dadosCartao = document.getElementById("dados-cartao");
    const radiosPagamento = document.querySelectorAll('input[name="pagamento"]');

    // --- 1. RENDERIZAR O RESUMO DA COMPRA ---
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    let totalGeral = 0;

    // Se houver uma tabela para listar os itens (opcional, baseado no seu HTML)
    if (lista) {
        lista.innerHTML = "";
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
    } else {
        // Se não tiver a tabela, calcula o total direto do carrinho para mostrar no parágrafo
        carrinho.forEach(item => {
            totalGeral += item.preco * item.quantidade;
        });
    }

    if (total) {
        total.innerHTML = `<strong>Total: R$ ${totalGeral.toFixed(2).replace(".", ",")}</strong>`;
    }


    // --- 2. MOSTRAR/ESCONDER CAMPOS DO CARTÃO ---
    // Como o PIX vem marcado por padrão, escondemos o cartão logo de início
    if (dadosCartao) {
        dadosCartao.style.display = "none"; 
    }

    radiosPagamento.forEach(radio => {
        radio.addEventListener("change", (e) => {
            if (e.target.value === "cartao") {
                dadosCartao.style.display = "block";
            } else {
                dadosCartao.style.display = "none";
            }
        });
    });


    // --- 3. PROCESSAR O PAGAMENTO (SUBMIT) ---
    if (formPagamento) {
        formPagamento.addEventListener("submit", (e) => {
            e.preventDefault(); // Impede a página de atualizar

            if (carrinho.length === 0) {
                alert("Seu carrinho está vazio! Adicione produtos antes de pagar.");
                window.location.href = "../index.html";
                return;
            }

            // Descobre qual opção foi selecionada
            const opcaoSelecionada = document.querySelector('input[name="pagamento"]:checked').value;

            // Se for cartão, valida se os campos estão preenchidos
            if (opcaoSelecionada === "cartao") {
                const numero = document.getElementById("numero-cartao").value.trim();
                const nome = document.getElementById("nome-cartao").value.trim();
                const validade = document.getElementById("validade").value;
                const cvv = document.getElementById("cvv").value.trim();

                if (!numero || !nome || !validade || !cvv) {
                    alert("Por favor, preencha todos os dados do cartão de crédito.");
                    return;
                }
            }

            // Sucesso!
            alert(`Pagamento realizado com sucesso via ${opcaoSelecionada.toUpperCase()}! Obrigado pela compra.`);

            // Limpa o carrinho para a próxima compra
            localStorage.removeItem("carrinho");

            // Redireciona para a página inicial
            window.location.href = "../index.html";
        });
    }
});