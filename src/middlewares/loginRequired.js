import jwt from 'jsonwebtoken';
require('dotenv').config({quiet: true});
import User from '../models/User';

export default async (req, res, next) => {
  const auth = req.headers.authorization;

  // Verifica se o token foi enviado
  if (!auth){
    return res.status(401).json({ errors: ['Login requerido.']});
  }

  const [, token] = auth.split(' ');

  try {
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = dados;

    // Verifica se existe usuário no BD com mesmo ID e email.
    const user = await User.findOne({ where: { id, email }});

    // Verifica se o usuário do token existe com mesmo ID e email.
    if (!user){
      return res.status(401).json({errors: ['Token inválido.']});
    }

    req.userId = dados.id;
    req.userEmail = dados.email;
    return next();
  } catch (e) {
    return res.status(401).json({errors: ['Token inválido ou expirado.']});
  }
};
