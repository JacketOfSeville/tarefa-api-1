const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

const produtosRoutes = require("./routes/produtos");
const usuariosRoutes = require("./routes/usuarios");

app.use(cors({
    origin: "http://localhost:3001"
}));

app.use(express.json());
app.use("/produtos", produtosRoutes);
app.use("/usuarios", usuariosRoutes);

app.get("/", (req, res) => {
    res.send("Servidor Node com Express")
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});