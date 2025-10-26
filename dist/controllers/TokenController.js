"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);
var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
require('dotenv').config({quiet: true});

class TokenController {
  async store(req, res) {
    try {
      const { email='', password='' } = req.body;

      // Verifica se email e senha foram enviados
      if (!email || !password) {
        return res.status(401).json({errors: ['Email ou senha não enviados.']});
      }

      const userBuscado = await _User2.default.findOne({ where: { email }});

      // Verifica se o usuário existe
      if (!userBuscado) {
        return res.status(401).json({ errors: ['Usuário não encontrado.'] });
      }

      const senhaValidada = await _bcryptjs2.default.compare(password, userBuscado.password_hash)

      // Verifica se a senha bate com a senha no BD.
      if (!senhaValidada) {
        return res.status(401).json({ errors: ['Senha inválida.'] });
      }

      const token = _jsonwebtoken2.default.sign({
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
exports. default = new TokenController();
