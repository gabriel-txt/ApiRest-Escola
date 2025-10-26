"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');
var _dbjs = require('../database/db.js'); var _dbjs2 = _interopRequireDefault(_dbjs);
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

const User = _dbjs2.default.define('User', {
    nome: {
      type: _sequelize.DataTypes.STRING,
      defaultValue: '',
      validate: {
        len: { // Validação de tamanho do nome
          args: [3, 255],
          msg: 'O nome deve ter entre 3 e 255 caracteres.',
        }
      },
    },
    email: {
      type: _sequelize.DataTypes.STRING,
      defaultValue: '',
      unique: {
        msg: 'Email já cadastrado.'
      },
      validate: { // Validação de email
        isEmail: {msg: 'Email inválido.'}
      },
    },
    password_hash: {
      type: _sequelize.DataTypes.STRING,
      defaultValue: '',
    },
    password: {
      type: _sequelize.DataTypes.VIRTUAL,
      defaultValue: '',
      validate: { // Validação de senha, precisa ter 6-50 caracteres
        len: {
          args: [6, 50],
          msg: 'A senha precisa ter entre 6 e 50 caracteres.',
        }
      },
    },

});

// Antes de salvar um User, encripta senha com hash e salva no BD.
User.addHook('beforeSave', async user => {
  user.password_hash = await _bcryptjs2.default.hash(user.password, 8);
});

module.exports = User;
