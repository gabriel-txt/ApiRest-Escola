import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
require('dotenv').config({quiet: true});

class TokenController {
  async store(req, res) {
    try {
      const { email='', password='' } = req.body;

      // Verifica se email e senha foram enviados
      if (!email || !password) {
        return res.status(401).json({errors: ['Email ou senha não enviados.']});
      }

      const userBuscado = await User.findOne({ where: { email }});

      // Verifica se o usuário existe
      if (!userBuscado) {
        return res.status(401).json({ errors: ['Usuário não encontrado.'] });
      }

      const senhaValidada = await bcrypt.compare(password, userBuscado.password_hash)

      // Verifica se a senha bate com a senha no BD.
      if (!senhaValidada) {
        return res.status(401).json({ errors: ['Senha inválida.'] });
      }

      const token = jwt.sign({
        id: userBuscado.id, email: userBuscado.email }, // payloads
        process.env.TOKEN_SECRET, // secret key
        { expiresIn: process.env.TOKEN_EXPIRATION } // options
      );

      return res.json({ token });

    } catch (e) {
      console.log(e);
      return res.status(401).json({ errors: ['Erro ao criar o token JWT']});
    }
  };
}
export default new TokenController();
