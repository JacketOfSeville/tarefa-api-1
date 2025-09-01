const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./src/database/banco.db');
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS produtos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome VARCHAR(255),
            valor DOUBLE,
            quantidade DOUBLE
        );
    `);
    db.run(`
        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome VARCHAR(255),
            senha VARCHAR(255),
            tipo_usuario VARCHAR(20)
        );
    `);
});
module.exports = db;