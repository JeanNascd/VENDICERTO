document.addEventListener('DOMContentLoaded', function () {
    // Função para carregar os dados do localStorage
    function carregarDados() {
        const dados = JSON.parse(localStorage.getItem('demaisCustos'));
        const campos = ['impostos', 'comissaoclassica', 'comissaopremium', 'anuncio', 'perdas_devolucoes'];

        campos.forEach(campo => {
            document.getElementById(campo).value = dados?.[campo] || 0;
        });
    }

    // Exibir mensagem de erro ao lado do campo
    function exibirErro(campo, mensagem) {
        let erro = document.querySelector(`#${campo} ~ .error-message`);
        if (!erro) {
            erro = document.createElement('span');
            erro.className = 'error-message';
            erro.style.color = 'red';
            erro.style.fontSize = '12px';
            erro.style.marginLeft = '10px';
            document.getElementById(campo).after(erro);
        }
        erro.textContent = mensagem;
    }

    // Remover mensagem de erro
    function limparErro(campo) {
        const erro = document.querySelector(`#${campo} ~ .error-message`);
        if (erro) erro.remove();
    }

    // Validação de valores positivos
    function validarValor(campo) {
        const valor = parseFloat(document.getElementById(campo).value);
        if (isNaN(valor) || valor < 0) {
            exibirErro(campo, 'Digite um número positivo válido.');
            return false;
        } else {
            limparErro(campo);
            return true;
        }
    }

    // Função para atualizar os valores no localStorage
    function atualizarValores() {
        const campos = ['impostos', 'comissaoclassica', 'comissaopremium', 'anuncio', 'perdas_devolucoes'];
        let dadosValidos = true;
        const dados = {};

        campos.forEach(campo => {
            if (!validarValor(campo)) {
                dadosValidos = false;
            } else {
                dados[campo] = parseFloat(document.getElementById(campo).value);
            }
        });

        if (!dadosValidos) {
            alert('Por favor, corrija os campos com erros antes de continuar.');
            return;
        }

        // Salva os dados no localStorage
        localStorage.setItem('demaisCustos', JSON.stringify(dados));
        alert('As taxas foram atualizadas com sucesso!');
    }

    // Adiciona validação em tempo real nos inputs
    function adicionarValidacaoTempoReal() {
        const campos = ['impostos', 'comissaoclassica', 'comissaopremium', 'anuncio', 'perdas_devolucoes'];
        campos.forEach(campo => {
            const input = document.getElementById(campo);
            input.addEventListener('input', () => validarValor(campo));
        });
    }

    // Inicializar
    carregarDados();
    adicionarValidacaoTempoReal();

    // Adicionar evento de clique no botão "Configurar"
    document.querySelector('.btn-configurar').addEventListener('click', atualizarValores);
});
