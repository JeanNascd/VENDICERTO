// Função para carregar o menu de produtos a partir do localStorage
function carregarProdutos() {
    // Recupera os dados de produtos do localStorage (caso existam)
    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];

    // Acessa o elemento select onde as opções serão inseridas
    let selectProduto = document.getElementById('produto');

    // Limpa qualquer opção existente 
    selectProduto.innerHTML = '<option value="">Selecione um produto</option>';

    // Verifica se há produtos no localStorage
    if (produtos.length > 0) {
        // Adiciona cada produto como uma opção no select
        produtos.forEach(produto => {
            let option = document.createElement('option');
            option.value = produto.descricao;
            option.textContent = produto.descricao;
            option.dataset.preco = produto.preco;  // Salva o preço do produto
            option.dataset.peso = produto.peso;   // Salva o peso do produto
            selectProduto.appendChild(option);
        });
    } else {
        // Caso não haja produtos
        let option = document.createElement('option');
        option.value = '';
    }
}

// Função para carregar o menu de embalagens a partir do localStorage
function carregarEmbalagens() {
    // Recupera os dados de embalagens do localStorage (caso existam)
    let embalagens = JSON.parse(localStorage.getItem('embalagens')) || [];

    // Acessa o elemento select onde as opções serão inseridas
    let SelectEmbalagem = document.getElementById('embalagem');

    // Limpa qualquer opção existente (se houver)
    SelectEmbalagem.innerHTML = '<option value="">Selecione uma embalagem</option>';

    // Verifica se há embalagens no localStorage
    if (embalagens.length > 0) {
        // Adiciona cada embalagem como uma opção no select
        embalagens.forEach(embalagem => {
            let option = document.createElement('option');
            option.value = embalagem.descricao;
            option.textContent = embalagem.descricao;
            option.dataset.preco = embalagem.preco;  // Salva o preço da embalagem
            SelectEmbalagem.appendChild(option);
        });
    } else {
        // Caso não haja embalagens
        let option = document.createElement('option');
        option.value = '';
    }
}

// Função que salva todos os dados inseridos no localStorage e redireciona para a página de resultados
function salvarDadosERedirecionar() {
    // Recupera os dados dos campos do formulário
    const produtoSelect = document.getElementById('produto');
    const produtoDescricao = produtoSelect.value;
    const produtoPreco = produtoSelect.selectedOptions[0]?.dataset.preco || '';  // Preço do produto
    const produtoPeso = produtoSelect.selectedOptions[0]?.dataset.peso || '';    // Peso do produto
    
    const embalagemSelect = document.getElementById('embalagem');
    const embalagemDescricao = embalagemSelect.value;
    const embalagemPreco = embalagemSelect.selectedOptions[0]?.dataset.preco || '';  // Preço da embalagem

    const freteGratis = document.querySelector('input[name="frete-gratis"]:checked') ? document.querySelector('input[name="frete-gratis"]:checked').value : '';
    const outrosCustos = parseFloat(document.getElementById('outros-custos').value);
    const margemLucro = parseFloat(document.getElementById('margem-lucro').value);

    // Validação dos campos obrigatórios
    if (!produtoDescricao) {
        alert('Por favor, selecione um produto.');
        return;
    }

    if (!embalagemDescricao) {
        alert('Por favor, selecione uma embalagem.');
        return;
    }

    if (!freteGratis) {
        alert('Por favor, selecione se o frete é grátis ou não.');
        return;
    }

    if (isNaN(outrosCustos) || outrosCustos < 0) {
        alert('Por favor, insira um valor válido e positivo para outros custos.');
        return;
    }

    if (isNaN(margemLucro) || margemLucro <= 0) {
        alert('Por favor, insira uma margem de lucro válida e positiva.');
        return;
    }

    // Cria um objeto com todos os dados
    const dadosFormulario = {
        produto: produtoDescricao,
        produtoPreco: produtoPreco,
        produtoPeso: produtoPeso,
        embalagem: embalagemDescricao,
        embalagemPreco: embalagemPreco,
        freteGratis: freteGratis,
        outrosCustos: outrosCustos,
        margemLucro: margemLucro
    };

    // Salva os dados no localStorage
    localStorage.setItem('dadosFormulario', JSON.stringify(dadosFormulario));

    // Redireciona para a página de resultados
    window.location.href = '../pages/resultados.html';
}

// Carrega os produtos e embalagens quando a página for carregada
window.onload = function() {
    carregarProdutos();
    carregarEmbalagens();
};