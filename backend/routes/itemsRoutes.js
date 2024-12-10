const express = require("express");
const router = express.Router();

const {
    insertItemToList,
    getAllItemsFromList,
    updateItemStatus,
    removeItemFromList,
} = require("../database/items");

// Inserir um item em uma lista
router.post("/", async (req, res) => {
    try {
        const { text, listId } = req.body;

        if (!text || !listId)
            return res.status(400).json({
                error: "Os campos 'text' e 'listId' são obrigatórios",
            });

        const { success, data, error } = await insertItemToList(listId, text);
        if (!success) throw new Error(error);

        res.status(201).json({
            item: data,
            message: "Item inserido com sucesso",
        });
    } catch (error) {
        console.error(`[${req.method} ${req.path}] Erro: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
});

// Retornar todos os itens de uma lista
router.get("/:listid", async (req, res) => {
    try {
        const listId = parseInt(req.params.listid);

        if (!listId)
            return res.status(400).json({
                error: "O parâmetro 'listId' é obrigatório e deve ser válido",
            });

        const { success, data, error } = await getAllItemsFromList(listId);
        if (!success) throw new Error(error);
        if (!data)
            return res.status(404).json({ error: "Lista não encontrada." });

        res.status(200).json({
            items: data,
            message: "Lista encontrada com sucesso",
        });
    } catch (error) {
        console.error(`[${req.method} ${req.path}] Erro: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
});

// Modificar o status de um item
router.put("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id))
            return res.status(400).json({
                error: "O parâmetro 'id' é obrigatório e deve ser inteiro",
            });

        const done = req.body.done;
        const { success, data, error } = await updateItemStatus(id, done);
        if (!success) throw new Error(error);
        if (!data)
            return res.status(404).json({ error: "Item não encontrado." });

        res.status(200).json({
            item: data,
            message: "Status do item atualizado",
        });
    } catch (error) {
        console.error(`[${req.method} ${req.path}] Erro: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
});

// Remover um item de uma lista
router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        if (isNaN(id))
            return res.status(400).json({
                error: "O parâmetro 'id' é obrigatório e deve ser inteiro",
            });

        const { success, error } = await removeItemFromList(parseInt(id));
        if (!success) throw new Error(error);

        res.status(200).json({ message: "Item removido com sucesso" });
    } catch (error) {
        console.error(`[${req.method} ${req.path}] Erro: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
