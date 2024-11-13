let produtos = JSON.parse(localStorage.getItem('produtos')) || []

//função para cadastrar o produto
function cadastrar () {
    //elementos de entrada 
    const desc = window.document.getElementById('desc')
    const sku = window.document.getElementById('sku')
    const prec = window.document.getElementById('prec')
    const pes = window.document.getElementById('pes') 
    const link = window.document.getElementById('link')

    //verificação de campo vazio
    if (!desc.value.trim() || !sku.value.trim() || !prec.value.trim() || !pes.value.trim() || !link.value.trim()) {
        alert('Valor inválido! Forneça as informações necessárias.')
        return;
        } else { 
            
            //adicionando o novo produto ao array e salvando no localstorage
            produtos.push ({
                    descricao: desc.value.trim(),
                    sku: sku.value.trim(),
                    preco: prec.value.trim(),
                    peso: pes.value.trim(),
                    link: link.value.trim()
                })
                    localStorage.setItem('produtos', JSON.stringify(produtos))

                //limpar os campos após o cadastro
                    desc.value = ''
                    sku.value = ''
                    prec.value = ''
                    pes.value = ''
                    link.value = ''

                    alert ('Produto cadastrado com sucesso!')

        }
}