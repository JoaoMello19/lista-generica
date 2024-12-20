const express = require("express");
const router = express.Router();

const {
    insertList,
    getAllLists,
    getListById,
    updateListById,
    deleteListById,
} = require("../database/lists");

router.post("/", async (req, res) => {
    const { name } = req.body;

    if (!name)
        return res.status(400).json({ error: "O campo 'nome' é obrigatório" });

    try {
        const { success, data, error } = await insertList(name);
        if (!success) throw new Error(error);

        res.status(201).json({
            list: data,
            message: "Lista criada com sucesso",
        });
    } catch (error) {
        console.error(`[${req.method} ${req.path}] Erro: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const { name } = req.query;
        let response = [];
        if (name) response = await getListByName(name);
        else response = await getAllLists();

        const { success, data, error } = response;
        if (!success) throw new Error(error);

        res.status(200).json({ lists: data });
    } catch (error) {
        console.error(`[${req.method} ${req.path}] Erro: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id))
            return res.status(400).json({
                error: "O parâmetro 'id' é obrigatório e deve ser inteiro",
            });

        const { success, data, error } = await getListById(id);
        if (!success) throw new Error(error);
        if (!data)
            return res.status(404).json({ error: "Lista não encontrada." });

        res.status(200).json({ list: data });
    } catch (error) {
        console.error(`[${req.method} ${req.path}] Erro: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id))
            return res.status(400).json({
                error: "O parametro 'id' é obrigatório e deve ser inteiro",
            });

        const { name } = req.body;
        if (!name)
            return res.status(400).json({
                error: "Informe o novo nome para atualizar.",
            });

        const { success, data, error } = await updateListById(id, name);
        if (!success) throw new Error(error);
        if (!data)
            return res.status(404).json({ error: "Lista não encontrada." });

        res.status(200).json({
            list: data,
            message: "Lista atualizada com sucesso",
        });
    } catch (error) {
        console.error(`[${req.method} ${req.path}] Erro: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id))
            return res.status(400).json({
                error: "O parametro 'id' é obrigatório e deve ser inteiro",
            });

        const { success, error } = await deleteListById(id);
        if (!success) throw new Error(error);
        res.status(200).json({ message: "Lista deletada com sucesso" });
    } catch (error) {
        console.error(`[${req.method} ${req.path}] Erro: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
