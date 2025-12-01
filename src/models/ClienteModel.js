const pool = require('../config/db');

const clienteModel = {

    /**
     * Seleciona um cliente pelo ID
     * @async
     * @param {number} pID - ID do cliente
     * @returns {Promise<Object[]>} Retorna array com os dados do cliente
     */
    selecionarPorId: async (pID) => {
        const sql = 'SELECT * FROM cliente WHERE idCliente = ?;';
        const [rows] = await pool.query(sql, [pID]);
        return rows;
    },

    /**
     * Seleciona todos os clientes cadastrados
     * @async
     * @returns {Promise<Object[]>} Retorna array com todos os clientes
     */
    selecionarTodos: async () => {
        const sql = 'SELECT * FROM cliente;';
        const [rows] = await pool.query(sql);
        return rows;
    },

    /**
     * Adiciona um novo cliente no banco
     * @async
     * @param {string} nome - Nome do cliente
     * @param {string} cpf - CPF do cliente
     * @param {string} telefone - Telefone do cliente
     * @param {string} email - Email do cliente
     * @param {string} endereco - Endereço completo do cliente
     * @returns {Promise<Object>} Retorna resultado da inserção
     */
    adicionarCliente: async (nome, cpf, telefone, email, endereco) => {
        const sql = `
            INSERT INTO cliente 
            (nomeCliente, cpfCliente, telefoneCliente, emailCliente, enderecoCompleto)
            VALUES (?,?,?,?,?);
        `;
        const values = [nome, cpf, telefone, email, endereco];
        const [rows] = await pool.query(sql, values);
        return rows;
    },

    /**
     * Analisa se já existe um cliente com determinado CPF
     * @async
     * @param {string} cpf - CPF a ser verificado
     * @returns {Promise<Object[]>} Retorna array com clientes encontrados (se houver)
     */
    analisarCPF: async (cpf) => {
        const sql = 'SELECT * FROM cliente WHERE cpfCliente = ?;';
        const [rows] = await pool.query(sql, [cpf]);
        return rows;
    },

    /**
     * Exclui um cliente pelo ID
     * @async
     * @param {number} pID - ID do cliente
     * @returns {Promise<Object>} Retorna resultado da exclusão
     */
    deleteCliente: async (pID) => {
        const sql = 'DELETE FROM cliente WHERE idCliente = ?;';
        const [rows] = await pool.query(sql, [pID]);
        return rows;
    },

    /**
     * Atualiza os dados de um cliente existente
     * @async
     * @param {number} id - ID do cliente
     * @param {string} nome - Nome do cliente
     * @param {string} cpf - CPF do cliente
     * @param {string} telefone - Telefone do cliente
     * @param {string} email - Email do cliente
     * @param {string} endereco - Endereço completo do cliente
     * @returns {Promise<Object>} Retorna resultado da atualização
     */
    alterarCliente: async (id, nome, cpf, telefone, email, endereco) => {
        const sql = `
            UPDATE cliente SET nomeCliente = ?, cpfCliente = ?, telefoneCliente = ?, emailCliente = ?, enderecoCompleto = ? WHERE idCliente = ?;
        `;
        const values = [nome, cpf, telefone, email, endereco, id];
        const [rows] = await pool.query(sql, values);
        return rows;
    }
};

module.exports = { clienteModel };
