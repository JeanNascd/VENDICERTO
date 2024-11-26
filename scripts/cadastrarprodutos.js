let produtos = JSON.parse(localStorage.getItem('produtos')) || [];

// Função para exibir uma mensagem de erro ao lado do campo
function exibirErro(campo, mensagem) {
    let erro = document.querySelector(`#${campo} ~ .error-message`);
    if (!erro) {
        erro = document.createElement("span");
        erro.className = "error-message";
        erro.style.color = "red";
        erro.style.fontSize = "12px";
        erro.style.marginLeft = "10px";
        document.getElementById(campo).after(erro);
    }
    erro.textContent = mensagem;
}

// Função para limpar a mensagem de erro
function limparErro(campo) {
    const erro = document.querySelector(`#${campo} ~ .error-message`);
    if (erro) erro.remove();
}

// Função para validar os campos
function validarCampo(campo, mensagem, tipo = "texto") {
    const valor = document.getElementById(campo).value.trim();

    if (tipo === "numero") {
        const numero = parseFloat(valor);
        if (isNaN(numero) || numero < 0) {
            exibirErro(campo, mensagem);
            return false;
        }
    } else if (!valor) {
        exibirErro(campo, mensagem);
        return false;
    }

    limparErro(campo);
    return true;
}

// Função para cadastrar o produto
function cadastrar() {
    const camposValidos = [
        validarCampo("desc", "Descrição não pode estar vazia."),
        validarCampo("sku", "O SKU deve ser um número positivo.", "numero"),
        validarCampo("prec", "O preço deve ser um número positivo.", "numero"),
        validarCampo("pes", "O peso deve ser um número positivo.", "numero"),
        validarCampo("link", "O link do produto é obrigatório."),
    ];

    // Verificar se todos os campos são válidos
    if (camposValidos.every(Boolean)) {
        // Elementos de entrada
        const desc = document.getElementById("desc");
        const sku = document.getElementById("sku");
        const prec = document.getElementById("prec");
        const pes = document.getElementById("pes");
        const link = document.getElementById("link");

        // Adicionando o novo produto ao array e salvando no localStorage
        produtos.push({
            descricao: desc.value.trim(),
            sku: parseInt(sku.value.trim()),
            preco: parseFloat(prec.value.trim()),
            peso: parseFloat(pes.value.trim()),
            link: link.value.trim(),
        });
        localStorage.setItem("produtos", JSON.stringify(produtos));

        // Limpar os campos após o cadastro
        desc.value = "";
        sku.value = "";
        prec.value = "";
        pes.value = "";
        link.value = "";

        alert("Produto cadastrado com sucesso!");
    } else {
        alert("Por favor, corrija os campos destacados antes de cadastrar.");
    }
}
