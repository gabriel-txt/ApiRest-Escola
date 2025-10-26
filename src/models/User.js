import {DataTypes} from 'sequelize';
import sequelize from '../database/db.js';
import bcrypt from 'bcryptjs';

const User = sequelize.define('User', {
    nome: {
      type: DataTypes.STRING,
      defaultValue: '',
      validate: {
        len: { // Validação de tamanho do nome
          args: [3, 255],
          msg: 'O nome deve ter entre 3 e 255 caracteres.',
        }
      },
    },
    email: {
      type: DataTypes.STRING,
      defaultValue: '',
      unique: {
        msg: 'Email já cadastrado.'
      },
      validate: { // Validação de email
        isEmail: {msg: 'Email inválido.'}
      },
    },
    password_hash: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    password: {
      type: DataTypes.VIRTUAL,
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
  user.password_hash = await bcrypt.hash(user.password, 8);
});

module.exports = User;
