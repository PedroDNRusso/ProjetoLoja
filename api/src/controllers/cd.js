const con = require('../connect');

function create(req, res) {
    const { capa, nome, lancamento, valor } = req.body;
    const sql = `INSERT INTO cd (capa, nome, lancamento, valor) VALUES ('${capa}', '${nome}', '${lancamento}', '${valor}')`;
    con.query(sql, (error, result) => {
        if (error) {
            res.status(500).json('Erro ao cadastrar paciente');
        } else {
            res.status(201).json('paciente cadastrado com sucesso');
        }
    });
};

function read(req, res) {
    const sql = 'SELECT * FROM cd';
    con.query(sql, (error, result) => {
        if (error) {
            res.status(500).json('Erro ao consultar gastos');
        } else {
            res.status(200).json(result);
        }
    });
}

function update(req, res) {
    const { id } = req.params;
    const { capa, nome, lancamento, valor } = req.body;
    const sql = `UPDATE cd SET capa = '${capa}', nome= '${nome}', lancamento = '${lancamento}', valor = '${valor}' WHERE cd_id = ${id}`;
    con.query(sql, (error, result) => {
        if (error) {
            res.status(500).json('Erro ao alterar paciente');
        } else {
            res.status(202).json('Paciente alterado com sucesso');
        }
    });
}

function del(req, res) {
    const { id } = req.params;
    const sql = `DELETE FROM cd WHERE cd_id = ${id}`;
    con.query(sql, (error, result) => {
        if (error) {
            res.status(500).json('Erro ao excluir paciente');
        } else {
            res.status(204).json('Paciente excluído com sucesso');
        }
    });
}


module.exports = {
    create,
    read,
    update,
    del
}