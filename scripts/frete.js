document.addEventListener('DOMContentLoaded', function () {
    // Função para carregar os dados do localStorage
    function carregarDados() {
        // Verifica se já existem dados armazenados no localStorage
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
            inputs.forEach(input => input.value = 0);
        }
    }

    // Função para salvar os dados no localStorage
    function salvarDados() {
        const frete = {};

        // Coleta os dados dos inputs
        const inputs = document.querySelectorAll('input[type="number"]');
        let todosPreenchidos = true;

        inputs.forEach(input => {
            if (!input.value) {
                todosPreenchidos = false;
            }
            frete[input.id] = parseFloat(input.value);
        });

        // Se algum campo estiver vazio, exibe o alerta
        if (!todosPreenchidos) {
            alert('Por favor, preencha todos os campos!');
            return;
        }

        // Salva no localStorage
        localStorage.setItem('frete', JSON.stringify(frete));

        // Alerta de sucesso
        alert('Dados salvos com sucesso!');
    }

    // Carregar os dados ao carregar a página
    carregarDados();

    // Adiciona o evento de click no botão salvar
    const botaoSalvar = document.getElementById('salvar');
    botaoSalvar.addEventListener('click', salvarDados);
});
