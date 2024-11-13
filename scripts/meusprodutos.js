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
        const descricao = document.getElementById("descricao").value;
        const sku = document.getElementById("sku").value;
        const peso = document.getElementById("peso").value;
        const link = document.getElementById("link").value;
        const preco = document.getElementById("preco").value;

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

    // Exibe todos os produtos ao carregar a página
    exibirProdutos(produtos);
});