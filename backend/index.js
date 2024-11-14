import express from "express";
import { getList } from "./database";

const PORT = 3000;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({ status: 200, message: "API padrão" });
});

app.post("/savelist", (req, res) => {
    res.json({ status: 200, message: "API de inserção" });
});

app.post("/loadlist", (req, res) => {
    const listId = req.params.listId;
    if (!listId || !Number.isInteger(listId))
        return res.json({
            status: 400,
            message: "O parâmetro 'listId' é obrigatório e deve ser inteiro",
        });

    const { success, message, data } = getList(listId);
    if (success) res.json({ status: 200, message, data });
    else res.json({ status: 400, message, data: null });
});

app.delete("/deletelist", (req, res) => {
    res.json({ status: 200, message: "API de remoçao" });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
