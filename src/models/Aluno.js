import {DataTypes} from 'sequelize';
import Foto from './Foto.js';
import sq from '../database/db.js';

const Aluno = sq.define('Aluno', {
    nome: {
      type: DataTypes.STRING,
      defaultValue: '',
      validate: {
        len: {
          args: [3, 255],
          msg: 'Nome deve ter entre 3 e 255 caracteres',
        }
      }
    },
    sobrenome: {
      type: DataTypes.STRING,
      defaultValue: '',
      validate: {
        len: {
          args: [3, 255],
          msg: 'Sobrenome deve ter entre 3 e 255 caracteres',
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      defaultValue: '',
      validate: {
        isEmail: {
          msg: 'E-mail inválido',
        }
      }
    },
    idade: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          msg: 'Idade deve ser um número inteiro',
        }
      }
    },
    peso: {
      type: DataTypes.FLOAT,
      validate: {
        isFloat: {
          msg: 'Peso deve ser um inteiro ou ponto flutuante',
        }
      }
    },
    altura: {
      type: DataTypes.FLOAT,
      validate: {
        isFloat: {
          msg: 'Peso deve ser um inteiro ou ponto flutuante',
        }
      }
    },
});

module.exports = Aluno;
