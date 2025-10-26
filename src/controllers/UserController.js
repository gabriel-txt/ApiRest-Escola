import User from '../models/User';

class UserController {

  // Mostrar todos os usuários
  async index(req, res){
    try {
      const users = await User.findAll({ attributes: ['id', 'nome', 'email']}); // Não mostrar atributos sensíveis
      return res.json(users);
    } catch (e) {
      return res.status(400).json({error: ['Erro ao buscar usuários']});
    }
  }

  // Mostra um usuário específico
  async show (req, res){
    try {
      const user = await User.findByPk(req.params.id, { attributes: ['id', 'nome', 'email']}); // Não mostrar atributos sensíveis
      return res.json(user);
    } catch (error) {
      return res.status(400).send('Erro ao mostrar usuário');
    }
  };

  // Criação de usuário
  async create(req, res){
    try {
      const novoUser = await User.create(req.body);
      const userBuscado = await User.findByPk(novoUser.id, { attributes: ['id', 'nome', 'email']}); // Não mostrar atributos sensíveis
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
        errors: [e?.message || 'Erro desconhecido'],
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

      const user = await User.findByPk(userId, { attributes: ['id', 'nome', 'email']});

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
        userEditado: await User.findByPk(userId, { attributes: ['id', 'nome', 'email']})
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

      const user = await User.findByPk(userId);

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

export default new UserController();
