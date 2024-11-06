// Embalagens armazenar dados da embalagem e editar e excluir embalagens, responsividade (revisar e corrigir se necessário)


document.addEventListener('DOMContentLoaded', () => {
    const embalagemForm = document.querySelector('form');
    const embalagemTableBody = document.querySelector('table tbody');

    // Carregar embalagens salvas no localStorage
    loadEmbalagens();

    // Adicionar nova embalagem
    embalagemForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const descricao = document.getElementById('embalagemDescricao').value;
        const peso = document.getElementById('embalagemPeso').value;
        const altura = document.getElementById('embalagemAltura').value;
        const largura = document.getElementById('embalagemLargura').value;
        const espessura = document.getElementById('embalagemEspessura').value;

        if (descricao && peso && altura && largura && espessura) {
            const novaEmbalagem = { descricao, peso, altura, largura, espessura };
            addEmbalagem(novaEmbalagem);
            saveEmbalagens();
            embalagemForm.reset();
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });

    // Função para adicionar embalagem à tabela e localStorage
    function addEmbalagem(embalagem) {
        const row = document.createElement('tr');

        // Adicionando dados
        row.innerHTML = `
            <td>${embalagem.descricao}</td>
            <td>${embalagem.peso}</td>
            <td>${embalagem.altura}</td>
            <td>${embalagem.largura}</td>
            <td>${embalagem.espessura}</td>
            <td>
                <button class="btn btn-sm btn-warning edit-btn">Editar</button>
                <button class="btn btn-sm btn-danger delete-btn">Excluir</button>
            </td>
        `;

        // Ações de editar e excluir
        row.querySelector('.edit-btn').addEventListener('click', () => editEmbalagem(row, embalagem));
        row.querySelector('.delete-btn').addEventListener('click', () => deleteEmbalagem(row, embalagem));

        embalagemTableBody.appendChild(row);
    }

    // Função para editar embalagem
    function editEmbalagem(row, embalagem) {
        document.getElementById('embalagemDescricao').value = embalagem.descricao;
        document.getElementById('embalagemPeso').value = embalagem.peso;
        document.getElementById('embalagemAltura').value = embalagem.altura;
        document.getElementById('embalagemLargura').value = embalagem.largura;
        document.getElementById('embalagemEspessura').value = embalagem.espessura;

        deleteEmbalagem(row, embalagem);
    }

    // Função para excluir embalagem
    function deleteEmbalagem(row, embalagem) {
        row.remove();
        let embalagens = getEmbalagens();
        embalagens = embalagens.filter(item => item.descricao !== embalagem.descricao);
        localStorage.setItem('embalagens', JSON.stringify(embalagens));
    }

    // Carregar embalagens do localStorage
    function loadEmbalagens() {
        const embalagens = getEmbalagens();
        embalagens.forEach(addEmbalagem);
    }

    // Obter embalagens do localStorage
    function getEmbalagens() {
        return JSON.parse(localStorage.getItem('embalagens') || '[]');
    }

    // Salvar embalagens no localStorage
    function saveEmbalagens() {
        const rows = Array.from(embalagemTableBody.querySelectorAll('tr'));
        const embalagens = rows.map(row => {
            const cells = row.querySelectorAll('td');
            return {
                descricao: cells[0].textContent,
                peso: cells[1].textContent,
                altura: cells[2].textContent,
                largura: cells[3].textContent,
                espessura: cells[4].textContent
            };
        });
        localStorage.setItem('embalagens', JSON.stringify(embalagens));
    }
});



