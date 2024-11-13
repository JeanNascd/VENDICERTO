document.addEventListener('DOMContentLoaded', function () {
    // Função para carregar os dados do localStorage
    function carregarDados() {
        // Verifica se já existem dados armazenados no localStorage
        const dados = JSON.parse(localStorage.getItem('demaisCustos'));
        
        if (dados) {
            // Preenche os inputs com os valores salvos
            document.getElementById('impostos').value = dados.impostos || 0;
            document.getElementById('comissaoclassica').value = dados.comissaoclassica || 0;
            document.getElementById('comissaopremium').value = dados.comissaopremium || 0;
            document.getElementById('anuncio').value = dados.anuncio || 0;
            document.getElementById('perdas_devolucoes').value = dados.perdas_devolucoes || 0;
        } else {
            // Valores padrão caso não haja dados no localStorage
            document.getElementById('impostos').value = 0;
            document.getElementById('comissaoclassica').value = 0;
            document.getElementById('comissaopremium').value = 0;
            document.getElementById('anuncio').value = 0;
            document.getElementById('perdas_devolucoes').value = 0;
        }
    }

    // Função para atualizar os valores no localStorage
    function atualizarValores() {
        const impostos = document.getElementById('impostos').value;
        const comissaoclassica = document.getElementById('comissaoclassica').value;
        const comissaopremium = document.getElementById('comissaopremium').value;
        const anuncio = document.getElementById('anuncio').value;
        const perdasDevolucoes = document.getElementById('perdas_devolucoes').value;

        // Verifica se algum campo está vazio
        if (!impostos || !comissaoclassica || !comissaopremium || !anuncio || !perdasDevolucoes) {
            alert('Por favor, preencha todos os campos!');
            return; // Impede o salvamento se algum campo estiver vazio
        }

        // Cria um objeto com os dados atualizados
        const dados = {
            impostos: parseFloat(impostos),
            comissaoclassica: parseFloat(comissaoclassica),
            comissaopremium: parseFloat(comissaopremium),
            anuncio: parseFloat(anuncio),
            perdas_devolucoes: parseFloat(perdasDevolucoes)
        };

        // Salva os dados no localStorage
        localStorage.setItem('demaisCustos', JSON.stringify(dados));

        // Exibe o alerta informando que os dados foram atualizados com sucesso
        alert('As taxas foram atualizadas com sucesso!');
    }

    // Carregar os dados ao carregar a página
    carregarDados();

    // Adicionar evento de clique no botão "Configurar"
    const botaoConfigurar = document.querySelector('.btn-configurar');
    botaoConfigurar.addEventListener('click', function () {
        atualizarValores();
    });
});
