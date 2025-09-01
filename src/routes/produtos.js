const express = require('express');
const router = express.Router();
const db = require('../database/db');

router.get('/', (req, res) => {
    db.all("SELECT * FROM produtos", [], (err, rows) => {
        if (err) return res.status(500).json({ erro: "Erro ao buscar produtos" });
        res.json(rows);
    });
});

// http://localhost:3000/produtos/id
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    db.get("SELECT * FROM produtos WHERE id = ?", [id], (err, row) => {
        if (err) return res.status(500).json({ erro: err.message });
        if (!row) return res.status(404).json({ erro: "Produto não encontrado" });

        res.json(row);
    })
});

router.post('/', (req, res) => {
    const { nome, valor, quantidade } = req.body;
    const sql = "INSERT INTO produtos (nome, valor, quantidade) VALUES (?, ?, ?)";
    db.run(sql, [nome, valor, quantidade], function (err) {
        if (err) return res.status(500).json({ erro: "Erro ao adicionar produto" });
        res.status(201).json({ id: this.lastID, nome, valor, quantidade });
    });
});

router.put('/:id', (req, res) => {
    const { nome, valor, quantidade } = req.body;
    const id = parseInt(req.params.id);
    const sql = "UPDATE produtos SET nome = ?, valor = ?, quantidade = ? WHERE id = ?";
    db.run(sql, [nome, valor, quantidade, id], function (err) {
        if (err) return res.status(500).json({ erro: "Erro ao atualizar produto" });
        if (this.changes === 0) return res.status(404).json({ erro: "Produto não encontrado" });
        res.json({ id, nome, valor, quantidade });
    });
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const sql = "DELETE FROM produtos WHERE id = ?";
    db.run(sql, [id], function (err) {
        if (err) return res.status(500).json({ erro: "Erro ao deletar produto" });
        if (this.changes === 0) return res.status(404).json({ erro: "Produto não encontrado" });
        res.status(204).send();
    });
});

module.exports = router;