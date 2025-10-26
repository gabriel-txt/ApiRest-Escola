import Aluno from '../models/Aluno';
import Foto from '../models/Foto';

class AlunoController {
  // Mostra todos os alunos
  async index(req, res) {
    const alunos = await Aluno.findAll({
      attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
      order: [['id', 'DESC'], [Foto, 'id', 'DESC']],
      include: {
        model: Foto,
        attributes: ['url', 'filename']
      }
    });
    res.json(alunos);
  }

  // Mostra um aluno específico
  async show(req, res){
    try {
      const aluno = await Aluno.findByPk(req.params.id, {
        attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
        order: [['id', 'DESC'], [Foto, 'id', 'DESC']],
        include: {
          model: Foto,
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
      const novoAluno = await Aluno.create(req.body);
      const userBuscado = await Aluno.findByPk(novoAluno.id, { attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'] });
      return res.json(userBuscado);
    } catch (e) {
      console.error(e);
      if (e && e.errors && Array.isArray(e.errors)) {
        return res.status(400).json({
          errors: e.errors.map((err) => err.message),
        });
      }
      return res.status(400).json({
        errors: [e?.message || 'Erro desconhecido'],
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

      const aluno = await Aluno.findByPk(alunoId, { attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura']});

      // Checa se o aluno existe
      if (!aluno){
        return res.status(400).json({errors: ['Aluno não existe']});
      }

      const alunoAtualizado = await aluno.update(req.body);
      return res.json({
        msg: 'Usuário atualizado com sucesso',
        alunoAtualizado: await Aluno.findByPk(alunoId, { attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura']})
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

      const aluno = await Aluno.findByPk(alunoId);

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

export default new AlunoController();
