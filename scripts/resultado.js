window.onload = function() {
    // Obtendo dados do localStorage
    const dadosFormularios = JSON.parse(localStorage.getItem('dadosFormulario'));
    const demaisCustos = JSON.parse(localStorage.getItem('demaisCustos'));
    const freteValor = JSON.parse(localStorage.getItem('frete'));

    // Declaração de variáveis
    const embalagens = parseFloat(dadosFormularios.embalagemPreco) || 0;
    let frete;
    const impostos = (parseFloat(dadosFormularios.produtoPreco) * parseFloat(demaisCustos.impostos)) / 100 || 0;
    const comissaoPremium = (parseFloat(dadosFormularios.produtoPreco) * parseFloat(demaisCustos.comissaopremium)) / 100 || 0;
    const comissaoClassica = (parseFloat(dadosFormularios.produtoPreco) * parseFloat(demaisCustos.comissaoclassica)) / 100 || 0;
    const ads = (parseFloat(dadosFormularios.produtoPreco) * parseFloat(demaisCustos.anuncio)) / 100 || 0;
    const produtoValor = parseFloat(dadosFormularios.produtoPreco) || 0;
    const perdasDevolucoes = (parseFloat(dadosFormularios.produtoPreco) * parseFloat(demaisCustos.perdas_devolucoes)) / 100 || 0;
    const outros = parseFloat(dadosFormularios.outrosCustos) || 0;
	const margem = parseFloat(dadosFormularios.margemLucro) || 0;

    // Frete
    if (dadosFormularios.freteGratis == "sim") {
        switch (true) {
            case (dadosFormularios.produtoPeso <= 300):
                frete = parseFloat(freteValor.Ate_300g) || 0;
                break;
            case (dadosFormularios.produtoPeso <= 500):
                frete = parseFloat(freteValor.De_300g_a_500g) || 0;
                break;
            case (dadosFormularios.produtoPeso <= 1000):
                frete = parseFloat(freteValor.De_500g_a_1kg) || 0;
                break;
            case (dadosFormularios.produtoPeso <= 2000):
                frete = parseFloat(freteValor.De_1kg_a_2kg) || 0;
                break;
            case (dadosFormularios.produtoPeso <= 3000):
                frete = parseFloat(freteValor.De_2kg_a_3kg) || 0;
                break;
            case (dadosFormularios.produtoPeso <= 4000):
                frete = parseFloat(freteValor.De_3kg_a_4kg) || 0;
                break;
            case (dadosFormularios.produtoPeso <= 5000):
                frete = parseFloat(freteValor.De_4kg_a_5kg) || 0;
                break;
            case (dadosFormularios.produtoPeso <= 9000):
                frete = parseFloat(freteValor.De_5kg_a_9kg) || 0;
                break;
            case (dadosFormularios.produtoPeso <= 13000):
                frete = parseFloat(freteValor.De_9kg_a_13kg) || 0;
                break;
            case (dadosFormularios.produtoPeso <= 17000):
                frete = parseFloat(freteValor.De_13kg_a_17kg) || 0;
                break;
            case (dadosFormularios.produtoPeso <= 23000):
                frete = parseFloat(freteValor.De_17kg_a_23kg) || 0;
                break;
            case (dadosFormularios.produtoPeso <= 30000):
                frete = parseFloat(freteValor.De_23kg_a_30kg) || 0;
                break;
            case (dadosFormularios.produtoPeso <= 40000):
                frete = parseFloat(freteValor.De_30kg_a_40kg) || 0;
                break;
            case (dadosFormularios.produtoPeso <= 50000):
                frete = parseFloat(freteValor.De_40kg_a_50kg) || 0;
                break;
            case (dadosFormularios.produtoPeso <= 60000):
                frete = parseFloat(freteValor.De_50kg_a_60kg) || 0;
                break;
            case (dadosFormularios.produtoPeso <= 70000):
                frete = parseFloat(freteValor.De_60kg_a_70kg) || 0;
                break;
            case (dadosFormularios.produtoPeso <= 80000):
                frete = parseFloat(freteValor.De_70kg_a_80kg) || 0;
                break;
            case (dadosFormularios.produtoPeso <= 90000):
                frete = parseFloat(freteValor.De_80kg_a_90kg) || 0;
                break;
            case (dadosFormularios.produtoPeso <= 100000):
                frete = parseFloat(freteValor.De_90kg_a_100kg) || 0;
                break;
            case (dadosFormularios.produtoPeso <= 125000):
                frete = parseFloat(freteValor.De_100kg_a_125kg) || 0;
                break;
            case (dadosFormularios.produtoPeso <= 150000):
                frete = parseFloat(freteValor.De_125kg_a_150kg) || 0;
                break;
            case (dadosFormularios.produtoPeso > 150000):
                frete = parseFloat(freteValor.Maior_que_150kg) || 0;
                break;
            default:
                frete = 10;
        }
    } else {
        frete = 0;
    }

    // Variaveis de resultado Preço Min e Preço de Venda
    const precoMinClassico = produtoValor + embalagens + impostos + comissaoClassica + ads + perdasDevolucoes + outros;
	const precoVendaClassico = precoMinClassico * (1 + (margem / 100));
    const precoMinPremium = produtoValor + embalagens + impostos + comissaoPremium + ads + perdasDevolucoes + outros;
    const precoVendaPremium = precoMinPremium * (1 + (margem / 100));
    

    // Função para formatar valores como R$
    function formatarMoeda(valor) {
        if (isNaN(valor)) return "R$ 0,00";  // Retorna "R$ 0,00" caso o valor não seja um número válido
        return "R$ " + valor.toFixed(2).replace(".", ",");
    }

    // Classico
    document.getElementById('embalagem-classico').textContent = formatarMoeda(embalagens);
    document.getElementById('impostos-classico').textContent = formatarMoeda(impostos);
    document.getElementById('comissao-classico').textContent = formatarMoeda(comissaoClassica);
    document.getElementById('ADS-classico').textContent = formatarMoeda(ads);
    document.getElementById('perdas-classico').textContent = formatarMoeda(perdasDevolucoes);
    document.getElementById('outros-classico').textContent = formatarMoeda(outros);
    document.getElementById('frete-classico').textContent = formatarMoeda(frete);
	document.getElementById('preco-minimo-classico').textContent = formatarMoeda(precoMinClassico);
	document.getElementById('preco-venda-classico').textContent = formatarMoeda(precoVendaClassico);

    // Premium
    document.getElementById('embalagem-premium').textContent = formatarMoeda(embalagens);
    document.getElementById('impostos-premium').textContent = formatarMoeda(impostos);
    document.getElementById('comissao-premium').textContent = formatarMoeda(comissaoPremium);
    document.getElementById('ADS-premium').textContent = formatarMoeda(ads);
    document.getElementById('perdas-premium').textContent = formatarMoeda(perdasDevolucoes);
    document.getElementById('outros-premium').textContent = formatarMoeda(outros);
    document.getElementById('frete-premium').textContent = formatarMoeda(frete);
    document.getElementById('preco-minimo-premium').textContent = formatarMoeda(precoMinPremium);
	document.getElementById('preco-venda-premium').textContent = formatarMoeda(precoVendaPremium);
};
