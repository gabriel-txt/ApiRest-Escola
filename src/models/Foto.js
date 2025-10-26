import {DataTypes} from 'sequelize';
import sq from '../database/db.js';
import appConfig from '../config/appConfig.js';

const Foto = sq.define('Foto', {
    originalname: {
      type: DataTypes.STRING,
      defaultValue: '',
      validate: {
        notEmpty: {
          msg: 'Campo não pode ficar vazio',
        }
      }
    },
    filename: {
      type: DataTypes.STRING,
      defaultValue: '',
      validate: {
        notEmpty: {
          msg: 'Campo não pode ficar vazio',
        }
      }
    },
    url: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${appConfig.url}/images/${this.getDataValue('filename')}`;
      }
    }
});

module.exports = Foto;
