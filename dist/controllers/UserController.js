"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class UserController {

  // Mostrar todos os usuários
  async index(req, res){
    try {
      const users = await _User2.default.findAll({ attributes: ['id', 'nome', 'email']}); // Não mostrar atributos sensíveis
      return res.json(users);
    } catch (e) {
      return res.status(400).json({error: ['Erro ao buscar usuários']});
    }
  }

  // Mostra um usuário específico
  async show (req, res){
    try {
      const user = await _User2.default.findByPk(req.params.id, { attributes: ['id', 'nome', 'email']}); // Não mostrar atributos sensíveis
      return res.json(user);
    } catch (error) {
      return res.status(400).send('Erro ao mostrar usuário');
    }
  };

  // Criação de usuário
  async create(req, res){
    try {
      const novoUser = await _User2.default.create(req.body);
      const userBuscado = await _User2.default.findByPk(novoUser.id, { attributes: ['id', 'nome', 'email']}); // Não mostrar atributos sensíveis
      return res.json(userBuscado);
    } catch (e) {
      console.error(e); // opcional, pra ver o erro real no console

      // Se for erro de validação do Sequelize
      if (e && e.errors && Array.isArray(e.errors)) {
        return res.status(400).json({
          errors: e.errors.map((err) => err.message),
        });
      }

      // Se for qualquer outro tipo de erro
      return res.status(400).json({
        errors: [_optionalChain([e, 'optionalAccess', _ => _.message]) || 'Erro desconhecido'],
      });
    }
  }

  // Atualização de usuário
  async update(req, res){
    try {
      const userId = req.userId;

      // Checa se o ID foi enviado
      if (!userId){
        return res.status(400).json({errors: ['ID do usuário não enviado']});
      }

      const user = await _User2.default.findByPk(userId, { attributes: ['id', 'nome', 'email']});

      // Checa se o usuário existe
      if (!user){
        return res.status(404).json({errors: ['Usuário não existe']});
      }

      // Checa se há dados para atualizar
      if (Object.keys(req.body).length === 0){
        return res.status(400).json({
          errors: ['Nenhum dado enviado para atualização'],
          userLogado: user
        });
      }

      const userAtualizado = await user.update(req.body);
      return res.json({
        msg: 'Usuário atualizado com sucesso',
        userEditado: await _User2.default.findByPk(userId, { attributes: ['id', 'nome', 'email']})
      });
    } catch (e) {
      console.log(e)
      return res.status(400).json({errors: ['Erro ao atualizar usuário']});
    }
  }

  // Exclusão de usuário
  async delete(req, res){
    try {
      const userId = req.userId;

      // Checa se o ID foi enviado
      if (!userId){
        return res.status(400).json({errors: ['ID do usuário não enviado']});
      }

      const user = await _User2.default.findByPk(userId);

      // Checa se o usuário existe
      if (!user) {
        return res.status(404).send('Usuário não encontrado');
      }

      const userDeletado = user;
      await user.destroy();
      return res.json({
        msg: 'Usuário deletado com sucesso!',
        userDeletado: {
          id: userDeletado.id,
          nome: userDeletado.nome,
          email: userDeletado.email
        }});
    } catch (error) {
      console.error('Erro ao deletar usuário');
      return res.status(400).send('Erro ao deletar usuário');
    }
  };
}

exports. default = new UserController();
