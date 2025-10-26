"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');
var _dbjs = require('../database/db.js'); var _dbjs2 = _interopRequireDefault(_dbjs);
var _appConfigjs = require('../config/appConfig.js'); var _appConfigjs2 = _interopRequireDefault(_appConfigjs);

const Foto = _dbjs2.default.define('Foto', {
    originalname: {
      type: _sequelize.DataTypes.STRING,
      defaultValue: '',
      validate: {
        notEmpty: {
          msg: 'Campo não pode ficar vazio',
        }
      }
    },
    filename: {
      type: _sequelize.DataTypes.STRING,
      defaultValue: '',
      validate: {
        notEmpty: {
          msg: 'Campo não pode ficar vazio',
        }
      }
    },
    url: {
      type: _sequelize.DataTypes.VIRTUAL,
      get() {
        return `${_appConfigjs2.default.url}/images/${this.getDataValue('filename')}`;
      }
    }
});

module.exports = Foto;
