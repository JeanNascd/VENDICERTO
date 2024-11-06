let produtos = JSON.parse(localStorage.getItem('produtos')) || []
function cadastrar () {
    let desc = window.document.getElementById('desc')
    let sku = window.document.getElementById('sku')
    let prec = window.document.getElementById('prec')
    let pes = window.document.getElementById('pes') 
    let link = window.document.getElementById('link')
        if (desc.value.length == 0 || sku.value.length == 0 || prec.value.length == 0 || pes.value.length == 0 || link.value.length == 0) {
                        window.alert('Valor inválido! Forneça as informações necessárias.')
        } else { 
            produtos.push ({
                    descricao: desc.value,
                    sku: sku.value,
                    preco: prec.value,
                    peso: pes.value,
                    link: link.value
                })
                    localStorage.setItem('produtos', JSON.stringify(produtos))

                    desc.value = ''
                    sku.value = ''
                    prec.value = ''
                    pes.value = ''
                    link.value = ''

                    window.alert ('Produto cadastrado com sucesso!')

        }
}