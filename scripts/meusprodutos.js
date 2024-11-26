document.addEventListener("DOMContentLoaded", function () {
    const tabelaProdutos = document.querySelector("tbody");
    let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    let produtoIndexEditando = null;

    // Função para exibir produtos na tabela
    function exibirProdutos(lista) {
        tabelaProdutos.innerHTML = "";
        lista.forEach((produto, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <th scope="row">${produto.descricao}</th>
                <td>${produto.sku}</td>
                <td>${produto.peso}</td>
                <td><a href="${produto.link}" target="_blank">${produto.link}</a></td>
                <td>${produto.preco}</td>
                <td>
                    <button class="iconBtn" onclick="editarProduto(${index})">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="iconBtn" onclick="deletarProduto(${index})">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            `;
            tabelaProdutos.appendChild(row);
        });
    }

    // Função para exibir erro em um campo
    function exibirErro(campo, mensagem) {
        let erro = document.querySelector(`#${campo.id} ~ .error-message`);
        if (!erro) {
            erro = document.createElement("span");
            erro.className = "error-message";
            erro.style.color = "red";
            erro.style.fontSize = "12px";
            erro.style.marginLeft = "10px";
            campo.after(erro);
        }
        erro.textContent = mensagem;
    }

    // Função para limpar erro de um campo
    function limparErro(campo) {
        const erro = document.querySelector(`#${campo.id} ~ .error-message`);
        if (erro) erro.remove();
    }

    // Validações de entrada
    function validarCampos(descricao, sku, peso, link, preco) {
        let valido = true;

        if (!descricao.trim()) {
            exibirErro(document.getElementById("descricao"), "Descrição é obrigatória.");
            valido = false;
        } else {
            limparErro(document.getElementById("descricao"));
        }

        if (!sku || isNaN(sku) || sku <= 0) {
            exibirErro(document.getElementById("sku"), "SKU deve ser um número positivo.");
            valido = false;
        } else {
            limparErro(document.getElementById("sku"));
        }

        if (!peso || isNaN(peso) || peso <= 0) {
            exibirErro(document.getElementById("peso"), "Peso deve ser um número positivo.");
            valido = false;
        } else {
            limparErro(document.getElementById("peso"));
        }

        const urlRegex = /^(https?:\/\/)?([\w.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/;
        if (!link.trim() || !urlRegex.test(link)) {
            exibirErro(document.getElementById("link"), "Link deve ser uma URL válida.");
            valido = false;
        } else {
            limparErro(document.getElementById("link"));
        }

        if (!preco || isNaN(preco) || preco <= 0) {
            exibirErro(document.getElementById("preco"), "Preço deve ser um número positivo.");
            valido = false;
        } else {
            limparErro(document.getElementById("preco"));
        }

        return valido;
    }

    // Função para editar produto
    window.editarProduto = function (index) {
        produtoIndexEditando = index;
        const produto = produtos[index];

        document.getElementById("descricao").value = produto.descricao;
        document.getElementById("sku").value = produto.sku;
        document.getElementById("peso").value = produto.peso;
        document.getElementById("link").value = produto.link;
        document.getElementById("preco").value = produto.preco;

        document.getElementById("modalEditarProduto").style.display = "block";
    };

    // Função para fechar o modal
    window.fecharModal = function () {
        document.getElementById("modalEditarProduto").style.display = "none";
    };

    // Função para salvar edição do produto
    window.salvarEdicao = function () {
        const descricao = document.getElementById("descricao").value.trim();
        const sku = parseInt(document.getElementById("sku").value, 10);
        const peso = parseFloat(document.getElementById("peso").value);
        const link = document.getElementById("link").value.trim();
        const preco = parseFloat(document.getElementById("preco").value);

        if (!validarCampos(descricao, sku, peso, link, preco)) {
            alert("Corrija os campos destacados antes de salvar.");
            return;
        }

        produtos[produtoIndexEditando] = { descricao, sku, peso, link, preco };
        localStorage.setItem("produtos", JSON.stringify(produtos));

        fecharModal();
        exibirProdutos(produtos);
    };

    // Função para deletar produto
    window.deletarProduto = function (index) {
        if (confirm("Tem certeza que deseja excluir este produto?")) {
            produtos.splice(index, 1);
            localStorage.setItem("produtos", JSON.stringify(produtos));
            exibirProdutos(produtos);
        }
    };

    // Função para filtrar produtos
    window.filtrarProdutos = function () {
        const termo = document.getElementById("pesquisa").value.toLowerCase();
        const produtosFiltrados = produtos.filter(produto =>
            produto.descricao.toLowerCase().includes(termo) ||
            produto.sku.toString().toLowerCase().includes(termo) ||
            produto.peso.toString().toLowerCase().includes(termo) ||
            produto.link.toLowerCase().includes(termo) ||
            produto.preco.toString().toLowerCase().includes(termo)
        );
        exibirProdutos(produtosFiltrados);
    };

    // Exibe todos os produtos ao carregar a página
    exibirProdutos(produtos);
});
