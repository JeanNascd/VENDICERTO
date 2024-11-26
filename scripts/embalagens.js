const descricaoInput = document.getElementById("embalagemDescricao");
const precoInput = document.getElementById("precoEmbalagem");
const tabelaBody = document.querySelector(".table tbody");
const adicionarBtn = document.querySelector(".btn-adicionar");

// Função para exibir uma mensagem de erro ao lado do campo
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

// Função para limpar a mensagem de erro
function limparErro(campo) {
    const erro = document.querySelector(`#${campo.id} ~ .error-message`);
    if (erro) erro.remove();
}

// Função para carregar os dados do localStorage na tabela
function carregarEmbalagens() {
    const embalagens = JSON.parse(localStorage.getItem("embalagens")) || [];
    embalagens.forEach((embalagem) => {
        adicionarLinhaTabela(embalagem.descricao, embalagem.preco);
    });
}

// Função para adicionar uma linha na tabela
function adicionarLinhaTabela(descricao, preco) {
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
}

// Função para salvar as embalagens no localStorage
function salvarEmbalagens(embalagens) {
    localStorage.setItem("embalagens", JSON.stringify(embalagens));
}

// Função para adicionar uma nova embalagem
function adicionarEmbalagem() {
    const descricao = descricaoInput.value.trim();
    const preco = parseFloat(precoInput.value.trim());

    let camposValidos = true;

    if (!descricao) {
        exibirErro(descricaoInput, "Descrição é obrigatória.");
        camposValidos = false;
    } else {
        limparErro(descricaoInput);
    }

    if (isNaN(preco) || preco < 0) {
        exibirErro(precoInput, "Preço deve ser um número positivo.");
        camposValidos = false;
    } else {
        limparErro(precoInput);
    }

    if (!camposValidos) {
        alert("Corrija os campos destacados antes de adicionar a embalagem.");
        return;
    }

    // Cria a embalagem
    const novaEmbalagem = { descricao, preco };

    // Recupera as embalagens atuais do localStorage
    const embalagens = JSON.parse(localStorage.getItem("embalagens")) || [];

    // Adiciona a nova embalagem
    embalagens.push(novaEmbalagem);

    // Salva as embalagens de volta no localStorage
    salvarEmbalagens(embalagens);

    // Adiciona a linha na tabela
    adicionarLinhaTabela(descricao, preco.toFixed(2));

    descricaoInput.value = "";
    precoInput.value = "";

    alert("Embalagem adicionada com sucesso!");
}

// Função para editar uma embalagem
function editarEmbalagem(linha) {
    const descricao = linha.children[0].textContent;
    const preco = linha.children[1].textContent;

    descricaoInput.value = descricao;
    precoInput.value = preco;

    tabelaBody.removeChild(linha);

    // Remove a embalagem antiga do localStorage, pois será editada
    const embalagens = JSON.parse(localStorage.getItem("embalagens")) || [];
    const novaLista = embalagens.filter(
        (item) => item.descricao !== descricao || item.preco !== parseFloat(preco)
    );
    salvarEmbalagens(novaLista);
}

// Função para excluir uma embalagem
function excluirEmbalagem(linha) {
    const descricao = linha.children[0].textContent;
    const preco = linha.children[1].textContent;

    // Remove a embalagem do localStorage
    const embalagens = JSON.parse(localStorage.getItem("embalagens")) || [];
    const novaLista = embalagens.filter(
        (item) => item.descricao !== descricao || item.preco !== parseFloat(preco)
    );
    salvarEmbalagens(novaLista);

    // Remove a linha da tabela
    tabelaBody.removeChild(linha);
}

// Carrega as embalagens do localStorage quando a página for carregada
document.addEventListener("DOMContentLoaded", carregarEmbalagens);

adicionarBtn.addEventListener("click", (event) => {
    event.preventDefault();
    adicionarEmbalagem();
});
