const { criarEntrega: criarEntregaModel, buscarTodasEntregas, buscarEntregaPorId, atualizarEntrega: atualizarEntregaModel, deletarEntrega: deletarEntregaModel } = require('../models/EntregaModel');

/**
 * Calcula os valores de uma entrega com base na distância, peso e tipo
 * @param {Object} dados Dados da entrega
 * @param {number} dados.distancia_km Distância em km
 * @param {number} dados.peso_kg Peso em kg
 * @param {number} dados.valor_base_km Valor base por km
 * @param {number} dados.valor_base_kg Valor base por kg
 * @param {string} dados.tipoEntrega Tipo de entrega (normal ou urgente)
 * @returns {Object} Valores calculados da entrega
 */
const calcularValoresEntrega = ({ distancia_km, peso_kg, valor_base_km, valor_base_kg, tipoEntrega }) => {
    const valorDistancia = distancia_km * valor_base_km;
    const valorPeso = peso_kg * valor_base_kg;

    let valorFinal = valorDistancia + valorPeso;
    let acrescimo = 0;
    if (tipoEntrega === 'urgente') acrescimo = valorFinal * 0.2;
    valorFinal += acrescimo;

    let desconto = 0;
    if (valorFinal > 500) {
        desconto = valorFinal * 0.1;
        valorFinal -= desconto;
    }

    let taxa = 0;
    if (peso_kg > 50) {
        taxa = 15;
        valorFinal += taxa;
    }

    return { valorDistancia, valorPeso, acrescimo, desconto, taxa, valorFinal};
};

const entregaController = {

    /**
     * Cria uma nova entrega
     * Rota: POST /entregas
     * @async
     * @function criarEntrega
     * @param {Request} req Objeto da requisição HTTP
     * @param {Response} res Objeto da resposta HTTP
     * @returns {Promise<Object>} Retorna mensagem de sucesso e id da entrega
     */
    criarEntrega: async (req, res) => {
        try {
            const dados = req.body;
            if (!dados.idPedidos || !dados.distancia_km || !dados.peso_kg || !dados.valor_base_km || !dados.valor_base_kg) {
                return res.status(400).json({ message: 'Todos os campos obrigatórios devem ser enviados' });
            }

            const calculo = calcularValoresEntrega(dados);

            const dadosEntrega = { idPedidos: dados.idPedidos, valorDistancia: calculo.valorDistancia, valorPeso: calculo.valorPeso, acrescimo: calculo.acrescimo, desconto: calculo.desconto, taxa: calculo.taxa, valorFinal: calculo.valorFinal, tipoEntrega: dados.tipoEntrega};

            const result = await criarEntregaModel(dadosEntrega);

            res.status(201).json({ message: 'Entrega criada com sucesso', entrega_id: result});
        } catch (error) {
            res.status(500).json({ message: 'Erro ao criar entrega'});
        }
    },

    /**
     * Lista todas as entregas
     * Rota: GET /entregas
     * @async
     * @function listarEntregas
     * @param {Request} req Objeto da requisição HTTP
     * @param {Response} res Objeto da resposta HTTP
     * @returns {Promise<Object>} Retorna array com todas as entregas
     */
    listarEntregas: async (req, res) => {
        try {
            const entregas = await buscarTodasEntregas();
            res.json(entregas);
        } catch (err) {
            res.status(500).json({ message: 'Erro ao listar entregas'});
        }
    },

    /**
     * Busca uma entrega pelo ID
     * Rota: GET /entregas/:id
     * @async
     * @function buscarEntrega
     * @param {Request} req Objeto da requisição HTTP
     * @param {Response} res Objeto da resposta HTTP
     * @returns {Promise<Object>} Retorna a entrega encontrada ou mensagem de erro
     */
    buscarEntrega: async (req, res) => {
        try {
            const id = req.params.id;
            const entrega = await buscarEntregaPorId(id);
            if (!entrega) return res.status(404).json({ message: 'Entrega não encontrada' });
            res.json(entrega);
        } catch (Erro) {
            res.status(500).json({ message: 'Erro ao buscar entrega'});
        }
    },

    /**
     * Atualiza uma entrega existente
     * Rota: PUT /entregas/:id
     * @async
     * @function atualizarEntrega
     * @param {Request} req Objeto da requisição HTTP
     * @param {Response} res Objeto da resposta HTTP
     * @returns {Promise<Object>} Retorna mensagem de sucesso ou erro
     */
    atualizarEntrega: async (req, res) => {
        try {
            const id = req.params.id;
            const dados = req.body;

            if (!dados.idPedidos || !dados.distancia_km || !dados.peso_kg || !dados.valor_base_km || !dados.valor_base_kg) {
                return res.status(400).json({ message: 'Todos os campos obrigatórios devem ser enviados' });
            }

            const calculo = calcularValoresEntrega(dados);

            const dadosEntrega = { idPedidos: dados.idPedidos, valorDistancia: calculo.valorDistancia, valorPeso: calculo.valorPeso, acrescimo: calculo.acrescimo, desconto: calculo.desconto, taxa: calculo.taxa, valorFinal: calculo.valorFinal, tipoEntrega: dados.tipoEntrega };

            await atualizarEntregaModel(id, dadosEntrega);

            res.json({ message: 'Entrega atualizada com sucesso' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar entrega'});
        }
    },

    /**
     * Deleta uma entrega pelo ID
     * Rota: DELETE /entregas/:id
     * @async
     * @function deletarEntrega
     * @param {Request} req Objeto da requisição HTTP
     * @param {Response} res Objeto da resposta HTTP
     * @returns {Promise<Object>} Retorna mensagem de sucesso ou erro
     */
    deletarEntrega: async (req, res) => {
        try {
            const id = req.params.id;
            await deletarEntregaModel(id);
            res.json({ message: 'Entrega deletada com sucesso' });
        } catch (Erro) {
            res.status(500).json({ message: 'Erro ao deletar entrega'});
        }
    }
};

module.exports = { entregaController };
