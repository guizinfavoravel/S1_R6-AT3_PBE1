const pool = require('../config/db');

const pedidosModel = {

    /**
     * Seleciona todos os pedidos cadastrados
     * @async
     * @returns {Promise<Object[]>} Retorna array com todos os pedidos
     */
    selecionarTodos: async () => {
        const sql = 'SELECT * FROM pedidos;';
        const [rows] = await pool.query(sql);
        return rows;
    },

    /**
     * Seleciona um pedido pelo ID
     * @async
     * @param {number} pID - ID do pedido
     * @returns {Promise<Object[]>} Retorna array com o pedido encontrado
     */
    selecionarPorId: async (pID) => {
        const sql = 'SELECT * FROM pedidos WHERE idPedidos = ?;';
        const values = [pID];
        const [rows] = await pool.query(sql, values);
        return rows;
    },

    /**
     * Insere um novo pedido no banco de dados
     * @async
     * @param {number} idCliente - ID do cliente que fez o pedido
     * @param {string} dataPedido - Data do pedido
     * @param {number} distancia - Distância do pedido em km
     * @param {number} pesoCarga - Peso da carga
     * @param {number} valorBaseKm - Valor base por km
     * @param {number} valorBaseKg - Valor base por kg
     * @returns {Promise<Object>} Retorna resultado da inserção
     */
    inserirPedidos: async (idCliente, dataPedido, distancia, pesoCarga, valorBaseKm, valorBaseKg) => {
        const sql = `
            INSERT INTO pedidos 
                (idCliente, dataPedido, distancia, pesoCarga, valorBaseKm, valorBaseKg)
            VALUES (?,?,?,?,?,?);
        `;
        const values = [idCliente, dataPedido, distancia, pesoCarga, valorBaseKm, valorBaseKg];
        const [rows] = await pool.query(sql, values);
        return rows;
    },

    /**
     * Atualiza os dados de um pedido existente
     * @async
     * @param {number} pId - ID do pedido a ser atualizado
     * @param {number} idCliente - ID do cliente
     * @param {string} dataPedido - Data do pedido
     * @param {number} distancia - Distância do pedido em km
     * @param {number} pesoCarga - Peso da carga
     * @param {number} valorBaseKm - Valor base por km
     * @param {number} valorBaseKg - Valor base por kg
     * @returns {Promise<Object>} Retorna resultado da atualização
     */
    alterarPedidos: async (pId, idCliente, dataPedido, distancia, pesoCarga, valorBaseKm, valorBaseKg) => {
        const sql = `
            UPDATE pedidos SET idCliente = ?, dataPedido = ?, distancia = ?, pesoCarga = ?, valorBaseKm = ?, valorBaseKg = ? WHERE idPedidos = ?;
        `;
        const values = [idCliente, dataPedido, distancia, pesoCarga, valorBaseKm, valorBaseKg, pId];
        const [rows] = await pool.query(sql, values);
        return rows;
    },

    /**
     * Exclui um pedido pelo ID
     * @async
     * @param {number} pID - ID do pedido
     * @returns {Promise<Object>} Retorna resultado da exclusão
     */
    excluirPedidos: async (pID) => {
        const sql = 'DELETE FROM pedidos WHERE idPedidos = ?;';
        const values = [pID];
        const [rows] = await pool.query(sql, values);
        return rows;
    }
};

module.exports = { pedidosModel };
