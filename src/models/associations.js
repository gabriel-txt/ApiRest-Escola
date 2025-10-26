import Aluno from './Aluno.js';
import Foto from './Foto.js';

// Definindo as associações

// Associação Aluno 1 -- * Foto
Aluno.hasMany(Foto, {
  foreignKey: 'aluno_id'
});

// Associação Foto * -- 0 Aluno
Foto.belongsTo(Aluno, {
  foreignKey: 'aluno_id'
});

export { Aluno, Foto };
