document.addEventListener('DOMContentLoaded', function () {
    // Função para exibir mensagem de erro ao lado de um campo
    function exibirErro(campo, mensagem) {
        let erro = document.querySelector(`#${campo.id} ~ .error-message`);
        if (!erro) {
            erro = document.createElement('span');
            erro.className = 'error-message';
            erro.style.color = 'red';
            erro.style.fontSize = '12px';
            erro.style.marginLeft = '10px';
            campo.after(erro);
        }
        erro.textContent = mensagem;
    }

    // Função para limpar a mensagem de erro
    function limparErro(campo) {
        const erro = document.querySelector(`#${campo.id} ~ .error-message`);
        if (erro) erro.remove();
    }

    // Função para carregar os dados do localStorage
    function carregarDados() {
        const dados = JSON.parse(localStorage.getItem('frete'));

        if (dados) {
            // Preenche os inputs com os valores salvos
            for (const key in dados) {
                if (dados.hasOwnProperty(key)) {
                    const input = document.getElementById(key);
                    if (input) input.value = dados[key];
                }
            }
        } else {
            // Inicializa todos os inputs com valor 0 caso não tenha valores salvos
            const inputs = document.querySelectorAll('input[type="number"]');
            inputs.forEach(input => (input.value = 0));
        }
    }

    // Função para salvar os dados no localStorage
    function salvarDados() {
        const frete = {};
        const inputs = document.querySelectorAll('input[type="number"]');
        let todosValidos = true;

        inputs.forEach(input => {
            const valor = parseFloat(input.value);

            // Verifica se o campo está vazio ou possui valor inválido
            if (!input.value.trim() || isNaN(valor) || valor < 0) {
                todosValidos = false;
                exibirErro(input, "Por favor, insira um valor válido (>= 0).");
            } else {
                limparErro(input);
                frete[input.id] = valor;
            }
        });

        // Se houver algum erro, não salva os dados
        if (!todosValidos) {
            alert("Corrija os campos destacados antes de salvar.");
            return;
        }

        // Salva no localStorage
        localStorage.setItem('frete', JSON.stringify(frete));

        // Alerta de sucesso
        alert('Dados salvos com sucesso!');
    }

    // Carregar os dados ao carregar a página
    carregarDados();

    // Adiciona o evento de clique no botão salvar
    const botaoSalvar = document.getElementById('salvar');
    botaoSalvar.addEventListener('click', salvarDados);
});
