"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Alunojs = require('./Aluno.js'); var _Alunojs2 = _interopRequireDefault(_Alunojs);
var _Fotojs = require('./Foto.js'); var _Fotojs2 = _interopRequireDefault(_Fotojs);

// Definindo as associações

// Associação Aluno 1 -- * Foto
_Alunojs2.default.hasMany(_Fotojs2.default, {
  foreignKey: 'aluno_id'
});

// Associação Foto * -- 0 Aluno
_Fotojs2.default.belongsTo(_Alunojs2.default, {
  foreignKey: 'aluno_id'
});

exports.Aluno = _Alunojs2.default; exports.Foto = _Fotojs2.default;
