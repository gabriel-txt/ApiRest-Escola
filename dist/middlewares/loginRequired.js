"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
require('dotenv').config({quiet: true});
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

exports. default = async (req, res, next) => {
  const auth = req.headers.authorization;

  // Verifica se o token foi enviado
  if (!auth){
    return res.status(401).json({ errors: ['Login requerido.']});
  }

  const [, token] = auth.split(' ');

  try {
    const dados = _jsonwebtoken2.default.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = dados;

    // Verifica se existe usuário no BD com mesmo ID e email.
    const user = await _User2.default.findOne({ where: { id, email }});

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
