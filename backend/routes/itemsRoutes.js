const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
    // inserir um item a uma lista
    const { text, listId } = req.body;
    res.status(200).json({ message: "Buscando no banco de dados..." });
});

router.get("/:listid", (req, res) => {
    // retornar todos os itens da lista
    const listId = req.params.listid;
    res.status(200).json({ message: "Buscando no banco de dados..." });
});

router.put("/", (req, res) => {
    // modificar um item (a principio apenas trocar o done)
    const { id } = req.body;
    res.status(200).json({ message: "Buscando no banco de dados..." });
});

router.delete("/", (req, res) => {
    // remover um item da lista
    const { id } = req.body;
    res.status(200).json({ message: "Buscando no banco de dados..." });
});
