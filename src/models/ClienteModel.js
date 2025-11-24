const pool = require('../config/db');

const clienteModel = {

        selecionarPorId: async (pID) => {
        const sql = 'SELECT * FROM clientes WHERE idCliente = ?;';
        const values = [pID]
        const [rows] = await pool.query(sql, values)
        return rows;
    },


    selecionarTodos: async (pID) => {
        const sql = 'SELECT * FROM clientes';
        const values = [pID]
        const [rows] = await pool.query(sql, values)
        return rows;
    },


    adicionarCliente: async (nome, cpf) => {
        const sql = 'INSERT INTO clientes (nomeCliente, cpfCliente) VALUES (?,?);';
        const values = [nome, cpf];
        const [rows] = await pool.query(sql, values);
        console.log(rows);
        return rows;
    },
    analisarCPF: async (analisarCPF) => {
        const sql = 'SELECT * FROM clientes WHERE cpfCliente=?;';
        const values = [analisarCPF];
        const [rows] = await pool.query(sql, values);
        console.log(rows);
        return rows;
    },
    
     
    deleteCliente: async (pID) => {
        const sql = 'DELETE FROM clientes WHERE idCliente = ?;';
        const values = [pID];
        const [rows] = await pool.query(sql, values)
        return rows;
    },
    alterarCliente: async (pId, nome, cpf) => { 
        const sql = 'UPDATE clientes SET nomeCliente=?, cpfCliente=? WHERE idCliente=?;';
        const values = [nome, cpf, pId];
        const [rows] = await pool.query(sql, values);
        console.log(rows);
        return rows;
    }
}
module.exports = { clienteModel}