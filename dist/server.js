"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _app = require('./app'); var _app2 = _interopRequireDefault(_app);
const connection = require('./database/db');
require('dotenv').config({quiet: true});

// Testa a conexão com o banco de dados
// (async () => {
//   try {
//     await connection.sync();
//     console.log('Database connected successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// })();

const PORT = process.env.PORT;
_app2.default.listen(PORT);
