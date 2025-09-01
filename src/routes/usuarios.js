const express = require('express');
const router = express.Router();
const db = require('../database/db');

router.get('/', (req, res) => {
    db.all("SELECT * FROM usuarios", [], (err, rows) => {
        if (err) return res.status(500).json({ erro: err.message });
        res.json(rows);
    });
});

// http://localhost:3000/usuarios/id
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    db.get("SELECT * FROM usuarios WHERE id = ?", [id], (err, row) => {
        if (err) return res.status(500).json({ erro: err.message });
        if (!row) return res.status(404).json({ erro: "Usuário não encontrado" });

        res.json(row);
    })
});

router.post('/', (req, res) => {
    const { nome, senha, tipo_usuario } = req.body;
    const sql = "INSERT INTO usuarios (nome, senha, tipo_usuario) VALUES (?, ?, ?)";
    db.run(sql, [nome, senha, tipo_usuario], function (err) {
        if (err) return res.status(500).json({ erro: "Erro ao adicionar usuário" });
        res.status(201).json({ id: this.lastID, nome, senha, tipo_usuario });
    });
});

router.put('/:id', (req, res) => {
    const { nome, senha, tipo_usuario } = req.body;
    const id = parseInt(req.params.id);
    const sql = "UPDATE usuarios SET nome = ?, senha = ?, tipo_usuario = ? WHERE id = ?";
    db.run(sql, [nome, senha, tipo_usuario, id], function (err) {
        if (err) return res.status(500).json({ erro: "Erro ao atualizar usuário" });
        if (this.changes === 0) return res.status(404).json({ erro: "Usuário não encontrado" });
        res.json({ id, nome, senha, tipo_usuario });
    });
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const sql = "DELETE FROM usuarios WHERE id = ?";
    db.run(sql, [id], function (err) {
        if (err) return res.status(500).json({ erro: "Erro ao deletar produto" });
        if (this.changes === 0) return res.status(404).json({ erro: "Produto não encontrado" });
        res.status(204).send();
    });
});

module.exports = router;