const info = document.getElementById('info');
info.addEventListener('submit', (event) => {
    event.preventDefault();
    const corpo = {
        capa: info.capa.value,
        nome: info.nome.value,
        lancamento: info.lancamento.value,
        valor: info.valor.value
    };

    fetch('http://localhost:4000/discos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(corpo)
    })
    .then(response => response.status)
    .then(status => {
        if (status === 201) {
            msg3('Disco cadastrado com sucesso');
        } else {
            msg3('Erro ao cadastrar Disco');
        }
    });
});

function excluir(id) {
    if (confirm('Tem certeza que deseja excluir este CD?')) {
        fetch(`http://localhost:4000/discos/${id}`, {
            method: 'DELETE'
        })
        .then(response => response.status)
        .then(status => {
            if (status === 201) {
                msg3('Disco excluído com sucesso');
            } else {
                msg3('Erro ao excluir Disco');
            }
        });
    }
}

function alterar(botao, id) {
    const linha = botao.parentElement;
    const nome = linha.children[2].innerText;
    const lancamento = linha.children[3].innerText;
    const valor = linha.children[4].innerText;

    const corpo = { nome, lancamento, valor };

    fetch(`http://localhost:4000/discos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(corpo)
    })
    .then(response => response.status)
    .then(status => {
        if (status === 200) {
            msg3('Disco atualizado com sucesso');
        } else {
            msg3('Erro ao atualizar Disco');
        }
    });
}

fetch('http://localhost:4000/discos')
    .then(response => response.json())
    .then(disco => {
        const tabela = document.getElementById('disco');
        disco.forEach((disco) => {
            const linha = document.createElement('tr');
            linha.innerHTML = `
            <td data-label="Id:">${disco.discos_id}</td>
            <td data-label="Capa:"><img src="${disco.capa}" width="50"/></td>
            <td data-label="Nome:" contenteditable="true">${disco.nome}</td>
            <td data-label="Lançamento:" contenteditable="true">${new Date(disco.lancamento).toLocaleDateString('pt-BR')}</td>
            <td data-label="Valor:" contenteditable="true">${disco.valor}</td>
            <td>
                <button onclick="alterar(${disco.discos_id})">U</button>
                <button onclick="excluir(${disco.discos_id})">D</button>
            </td>
            `;
            tabela.appendChild(linha);
        });
    });

function msg3(mensagem) {
    const msg = document.getElementById('msg');
    msg.innerHTML = mensagem;
    setTimeout(() => { msg.innerHTML = ""; }, 1500);
}




