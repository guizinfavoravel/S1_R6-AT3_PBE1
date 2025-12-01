const db = require('../config/db');

/**
 * Registra uma entrega no banco de dados vinculada a um pedido
 * @async
 * @param {Object} entrega Objeto contendo os valores calculados da entrega
 * @param {number} entrega.idPedidos
 * @param {number} entrega.valorDistancia
 * @param {number} entrega.valorPeso
 * @param {number} entrega.acrescimo
 * @param {number} entrega.desconto
 * @param {number} entrega.taxa
 * @param {number} entrega.valorFinal
 * @param {string} entrega.tipoEntrega
 * @returns {Promise<Object>} Retorna o ID da entrega inserida
 */
const criarEntrega = async (entrega) => {
    const sql = `
        INSERT INTO entregas 
        (idPedidos, valorDistancia, valorPeso, acrescimo, desconto, taxa, valorFinal, tipoEntrega)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [ entrega.idPedidos, entrega.valorDistancia, entrega.valorPeso, entrega.acrescimo, entrega.desconto, entrega.taxa, entrega.valorFinal, entrega.tipoEntrega
    ];
    const [result] = await db.execute(sql, params);
    return { id: result.insertId };
};

/**
 * Busca todas as entregas registradas
 * @async
 * @returns {Promise<Object[]>} Retorna array com todas as entregas
 */
const buscarTodasEntregas = async () => {
    const [rows] = await db.execute('SELECT * FROM entregas');
    return rows;
};

/**
 * Busca uma entrega pelo ID
 * @async
 * @param {number} id ID da entrega
 * @returns {Promise<Object|null>} Retorna a entrega encontrada ou null se não existir
 */
const buscarEntregaPorId = async (id) => {
    const [rows] = await db.execute('SELECT * FROM entregas WHERE idEntregas = ?', [id]);
    return rows[0] || null;
};

/**
 * Atualiza os dados de uma entrega existente
 * @async
 * @param {number} id ID da entrega
 * @param {Object} entrega Objeto com os novos valores da entrega
 * @returns {Promise<void>}
 */
const atualizarEntrega = async (id, entrega) => {
    const sql = `
        UPDATE entregas 
        SET idPedidos = ?, valorDistancia = ?, valorPeso = ?, acrescimo = ?, desconto = ?, taxa = ?, valorFinal = ?, tipoEntrega = ?
        WHERE idEntregas = ?
    `;
    const params = [ entrega.idPedidos, entrega.valorDistancia, entrega.valorPeso, entrega.acrescimo, entrega.desconto, entrega.taxa, entrega.valorFinal, entrega.tipoEntrega, id
    ];
    await db.execute(sql, params);
};

/**
 * Deleta uma entrega pelo ID
 * @async
 * @param {number} id ID da entrega
 * @returns {Promise<void>}
 */
const deletarEntrega = async (id) => {
    await db.execute('DELETE FROM entregas WHERE idEntregas = ?', [id]);
};

module.exports = { criarEntrega, buscarTodasEntregas, buscarEntregaPorId, atualizarEntrega, deletarEntrega };