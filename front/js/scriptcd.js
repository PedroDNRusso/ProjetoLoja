const info = document.getElementById('info');
info.addEventListener('submit', (event) => {
    event.preventDefault();
    const corpo = {
        capa: info.capa.value,
        nome: info.nome.value,
        lancamento: info.lancamento.value,
        valor: info.valor.value
    };

    fetch('http://localhost:4000/cd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(corpo)
    })
    .then(response => response.status)
    .then(status => {
        if (status === 201) {
            msg3('CD cadastrado com sucesso');
        } else {
            msg3('Erro ao cadastrar CD');
        }
    });
});

function excluir(id) {
    if (confirm('Tem certeza que deseja excluir este CD?')) {
        fetch(`http://localhost:4000/cd/${id}`, {
            method: 'DELETE'
        })
        .then(response => response.status)
        .then(status => {
            if (status === 201) {
                msg3('CD excluído com sucesso');
            } else {
                msg3('Erro ao excluir CD');
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

    fetch(`http://localhost:4000/cd/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(corpo)
    })
    .then(response => response.status)
    .then(status => {
        if (status === 200) {
            msg3('CD atualizado com sucesso');
        } else {
            msg3('Erro ao atualizar CD');
        }
    });
}

fetch('http://localhost:4000/cd')
    .then(response => response.json())
    .then(cdLista => {
        const tabela = document.getElementById('cd');
        cdLista.forEach((cd) => {
            const linha = document.createElement('tr');
            linha.innerHTML = `
            <td data-label="Id:">${cd.cd_id}</td>
            <td data-label="Capa:"><img src="${cd.capa}" width="50"/></td>
            <td data-label="Nome:" contenteditable="true">${cd.nome}</td>
            <td data-label="Lançamento:" contenteditable="true">${new Date(cd.lancamento).toLocaleDateString('pt-BR')}</td>
            <td data-label="Valor:" contenteditable="true">${cd.valor}</td>
            <td>
                <button onclick="alterar(${cd.cd_id})">U</button>
                <button onclick="excluir(${cd.cd_id})">D</button>
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




