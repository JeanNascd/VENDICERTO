const descricaoInput = document.getElementById("embalagemDescricao");
const precoInput = document.getElementById("precoEmbalagem");
const tabelaBody = document.querySelector(".table tbody");
const adicionarBtn = document.querySelector(".btn-adicionar");

function adicionarEmbalagem() {
    const descricao = descricaoInput.value.trim();
    const preco = precoInput.value.trim();

    if (descricao === "" || preco === "") {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const novaLinha = document.createElement("tr");

    const colunaDescricao = document.createElement("td");
    colunaDescricao.textContent = descricao;

    const colunaPreco = document.createElement("td");
    colunaPreco.textContent = preco;

    const colunaAcoes = document.createElement("td");

    // Criação do ícone de edição
    const imgEditar = document.createElement("img");
    imgEditar.src = "../images/botao_editar.svg";
    imgEditar.alt = "Editar";
    imgEditar.className = "me-2";
    imgEditar.style.cursor = "pointer";
    imgEditar.onclick = () => editarEmbalagem(novaLinha);

    // Criação do ícone de exclusão
    const imgExcluir = document.createElement("img");
    imgExcluir.src = "../images/trash.svg";
    imgExcluir.alt = "Excluir";
    imgExcluir.style.cursor = "pointer";
    imgExcluir.onclick = () => excluirEmbalagem(novaLinha);

    // Adiciona os ícones na coluna de ações
    colunaAcoes.appendChild(imgEditar);
    colunaAcoes.appendChild(imgExcluir);

    novaLinha.appendChild(colunaDescricao);
    novaLinha.appendChild(colunaPreco);
    novaLinha.appendChild(colunaAcoes);

    tabelaBody.appendChild(novaLinha);

    descricaoInput.value = "";
    precoInput.value = "";
}

function editarEmbalagem(linha) {
    const descricao = linha.children[0].textContent;
    const preco = linha.children[1].textContent;

    descricaoInput.value = descricao;
    precoInput.value = preco;

    tabelaBody.removeChild(linha);
}

function excluirEmbalagem(linha) {
    tabelaBody.removeChild(linha);
}

adicionarBtn.addEventListener("click", (event) => {
    event.preventDefault(); 
    adicionarEmbalagem();
});
