
const { clienteModel } = require('../models/ClienteModel')
const clienteController = {
    selecionarTodosClientes: async (req, res) => {
        try {
            const resultado = await clienteModel.selecionarTodos();
            if (!resultado || resultado.length === 0) {
                return res.status(400).json({ message: 'A tabela Clientes não contém registros' })
            }

            return res.status(200).json({ message: 'Resultado dos dados listados:', data: resultado })

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message })
        }
    },
    adicionarCliente: async (req, res) => {

        try {
            const { nome, cpf } = req.body;

            console.log(cpf.length)
            if (!nome || nome.length < 3 || !String(nome) || !Number(cpf) || cpf.length != 11) {
                return res.status(400).json({ message: 'Dados invalidos' })
            }
            const consultarCPF = await clienteModel.analisarCPF(cpf)
            if (consultarCPF.length > 0) {
                return res.status(409).json({ message: "Cpf já esta cadastrado!" })

            }
            const resultado = await clienteModel.adicionarCliente(nome, cpf)
            if (resultado.affectedRows === 1 && resultado.insertId !== 0) {
                res.status(201).json({ message: 'Registro incluido com sucesso', result: resultado })
            } else {
                throw new Error('ocorreu um erro ao incluir o registro')
            }
            console.log(cpf)
        } catch (error) {
            console.error(error)
            res.status(500).json({ Message: 'Ocorreu um erro no servidor.', errorMessage: error.message })
        }
    },

    excluirCliente: async (req, res) => {
        try {
            const id = Number(req.params.idCliente)
            if (!id || !Number.isInteger(id)) {
                return res.status(400).json({ message: "Forneça um ID valido!" })
            }
            const consulta = await clienteModel.selecionarPorId(id);
            if (consulta.length === 0) {
                throw new Error("Registro não localizado");

            }
            else {
                const resultado = await clienteModel.deleteCliente(id);
                console.log(resultado);
                if (resultado.affectedRows === 1) {
                    res.status(201).json({ message: "Cliente excluido com sucesso ", data: resultado })
                }
                else {
                    throw new Error("Não foi possivel excluir o Cliente");

                }
            }
        } catch (error) {
            console.error(error)
            res.status(500).json({ Message: 'Ocorreu um erro no servidor.', errorMessage: error.message })
        }
    },
    atualizarCliente: async (req, res) => {
        try {
            const idCliente = Number(req.params.idCliente)
            let { nome, cpf } = req.body
            nome = nome.trim();
            if (!idCliente || !nome || !cpf || typeof idCliente !== 'number' || !isNaN(nome) || isNaN(cpf) || cpf.length < 11 || nome.trim().length < 3) {
                return res.status(400).json({ message: "Verifique os dados enviados e tente novamente!" });
            }
            const ClienteAtual = await clienteModel.selecionarPorId(idCliente)
            if (!ClienteAtual || ClienteAtual.length === 0) {
                throw new Error("Registro não localizado");
            }

            const novoNome = nome.trim() ?? ClienteAtual[0].nomeCLiente;
            const novoCpf = cpf ?? ClienteAtual[0].cpfCliente;
            const resultado = await clienteModel.alterarCliente(idCliente, novoNome, novoCpf);
            if (resultado.changedRows === 0) {
                throw new Error("Ocorreu um erro ao atualizar");

            }
            console.log(cpf, nome)
            return res.status(200).json({ message: "Registro atualizado com sucesso", data: resultado })
        } catch (error) {
            console.error(error)
            res.status(500).json({ Message: 'Ocorreu um erro no servidor.', errorMessage: error.message })
        }


    }

}





module.exports = { clienteController }