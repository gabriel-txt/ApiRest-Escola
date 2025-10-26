"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');
var _Fotojs = require('./Foto.js'); var _Fotojs2 = _interopRequireDefault(_Fotojs);
var _dbjs = require('../database/db.js'); var _dbjs2 = _interopRequireDefault(_dbjs);

const Aluno = _dbjs2.default.define('Aluno', {
    nome: {
      type: _sequelize.DataTypes.STRING,
      defaultValue: '',
      validate: {
        len: {
          args: [3, 255],
          msg: 'Nome deve ter entre 3 e 255 caracteres',
        }
      }
    },
    sobrenome: {
      type: _sequelize.DataTypes.STRING,
      defaultValue: '',
      validate: {
        len: {
          args: [3, 255],
          msg: 'Sobrenome deve ter entre 3 e 255 caracteres',
        }
      }
    },
    email: {
      type: _sequelize.DataTypes.STRING,
      defaultValue: '',
      validate: {
        isEmail: {
          msg: 'E-mail inválido',
        }
      }
    },
    idade: {
      type: _sequelize.DataTypes.INTEGER,
      validate: {
        isInt: {
          msg: 'Idade deve ser um número inteiro',
        }
      }
    },
    peso: {
      type: _sequelize.DataTypes.FLOAT,
      validate: {
        isFloat: {
          msg: 'Peso deve ser um inteiro ou ponto flutuante',
        }
      }
    },
    altura: {
      type: _sequelize.DataTypes.FLOAT,
      validate: {
        isFloat: {
          msg: 'Peso deve ser um inteiro ou ponto flutuante',
        }
      }
    },
});

module.exports = Aluno;
