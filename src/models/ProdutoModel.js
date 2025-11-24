const pool = require('../config/db');


const produtoModel = {


    selecionarTodos: async () => {
        const sql = 'SELECT * FROM produtos;';
        const [rows] = await pool.query(sql)
        return rows;
    },


    selecionarPorId: async (pID) => {
        const sql = 'SELECT * FROM produtos WHERE id_produto = ?;';
        const values = [pID]
        const [rows] = await pool.query(sql, values)
        return rows;
    },



    inserirProduto: async (pDescricao, pValores) => {
        const sql = 'INSERT INTO produtos (descricao, valor) VALUES (?,?);';
        const values = [pDescricao, pValores];
        const [rows] = await pool.query(sql, values);
        console.log(rows);
        return rows;
    },


    alterarProduto: async (pId, pDescricao, pValores) => { 
        const sql = 'UPDATE produtos SET descricao=?, valor=? WHERE id_produto=?;';
        const values = [pDescricao, pValores, pId];
        const [rows] = await pool.query(sql, values);
        console.log(rows);
        return rows;
    },

    excluirProduto: async (pID) => {
        const sql = 'DELETE FROM produtos WHERE id_produto = ?;';
        const values = [pID];
        const [rows] = await pool.query(sql, values)
        return rows;
    }

}
module.exports = { produtoModel }