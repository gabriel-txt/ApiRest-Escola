"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }var _Aluno = require('../models/Aluno'); var _Aluno2 = _interopRequireDefault(_Aluno);
var _Foto = require('../models/Foto'); var _Foto2 = _interopRequireDefault(_Foto);

class AlunoController {
  // Mostra todos os alunos
  async index(req, res) {
    const alunos = await _Aluno2.default.findAll({
      attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
      order: [['id', 'DESC'], [_Foto2.default, 'id', 'DESC']],
      include: {
        model: _Foto2.default,
        attributes: ['url', 'filename']
      }
    });
    res.json(alunos);
  }

  // Mostra um aluno específico
  async show(req, res){
    try {
      const aluno = await _Aluno2.default.findByPk(req.params.id, {
        attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
        order: [['id', 'DESC'], [_Foto2.default, 'id', 'DESC']],
        include: {
          model: _Foto2.default,
          attributes: ['url', 'filename']
        }
      });
      res.json(aluno);
    } catch (e) {
      return res.status(400).json({error: ['Erro ao buscar aluno']});
    }
  }

  // Criação de aluno
  async store(req, res){
    try {
      const novoAluno = await _Aluno2.default.create(req.body);
      const userBuscado = await _Aluno2.default.findByPk(novoAluno.id, { attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'] });
      return res.json(userBuscado);
    } catch (e) {
      console.error(e);
      if (e && e.errors && Array.isArray(e.errors)) {
        return res.status(400).json({
          errors: e.errors.map((err) => err.message),
        });
      }
      return res.status(400).json({
        errors: [_optionalChain([e, 'optionalAccess', _ => _.message]) || 'Erro desconhecido'],
      });
    }
  }

  // Atualização de aluno
  async update(req, res){
    try {
      const alunoId = req.params.id;

      // Checa se o ID foi enviado
      if (!alunoId){
        return res.status(400).json({errors: ['ID do aluno não enviado']});
      }

      const aluno = await _Aluno2.default.findByPk(alunoId, { attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura']});

      // Checa se o aluno existe
      if (!aluno){
        return res.status(400).json({errors: ['Aluno não existe']});
      }

      const alunoAtualizado = await aluno.update(req.body);
      return res.json({
        msg: 'Usuário atualizado com sucesso',
        alunoAtualizado: await _Aluno2.default.findByPk(alunoId, { attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura']})
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({error: ['Erro ao atualizar aluno']});
    }
  }

  // Exclusão de aluno
  async delete(req, res){
    try {
      const alunoId = req.params.id;

      // Checa se o ID foi enviado
      if (!alunoId){
        return res.status(400).json({errors: ['ID do aluno não enviado']});
      }

      const aluno = await _Aluno2.default.findByPk(alunoId);

      // Checa se o aluno existe
      if (!aluno){
        return res.status(400).json({errors: ['Aluno não existe']});
      }

      const alunoDeletado = aluno;
      await aluno.destroy();
      return res.json({message: 'Aluno excluído com sucesso', alunoDeletado: {id: alunoDeletado.id, nome: alunoDeletado.nome, sobrenome: alunoDeletado.sobrenome, email: alunoDeletado.email, idade: alunoDeletado.idade, peso: alunoDeletado.peso, altura: alunoDeletado.altura}});
    } catch (e) {
      return res.status(400).json({error: ['Erro ao excluir aluno']});
    }
  }
}

exports. default = new AlunoController();
