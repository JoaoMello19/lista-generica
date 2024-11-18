import cors from "cors";
import express from "express";
import {
    createList,
    getList,
    getAllLists,
    addItemToList,
    dropDB,
} from "./database.js";

const PORT = 3000;
const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
    })
);

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

app.post("/load", async (req, res) => {
    const { success, message, data } = await getAllLists();
    if (success) res.json({ status: 200, message, data });
    else res.json({ status: 400, message, data: null });
});

app.delete("/deletelist", (req, res) => {
    res.json({ status: 200, message: "API de remoçao" });
});

/** ROTAS DE DEV */
app.get("/insertdummy", (req, res) => {
    const listsData = [
        {
            title: "Compras da Semana",
            items: [
                { title: "arroz" },
                { title: "feijão" },
                { title: "batata" },
                { title: "macarrão" },
                { title: "café" },
                { title: "óleo" },
                { title: "banana maça" },
            ],
        },
        {
            title: "Lembretes",
            items: [
                { title: "Pegar mala" },
                { title: "Tirar o lixo" },
                { title: "Passar roupas" },
                { title: "Pagar o aluguel" },
            ],
        },
        {
            title: "Aleatório",
            items: [
                { title: "Unimed" },
                { title: "Tênis" },
                { title: "Viagem dia 12" },
                { title: "Comprar caderno" },
            ],
        },
    ];

    listsData.forEach(async (list) => {
        const {
            success,
            message,
            data: newList,
        } = await createList(list.title);
        if (success) {
            list.items.forEach(async (item) => {
                const { message, data } = await addItemToList(
                    item.title,
                    newList._id
                );
            });
        }
    });

    res.redirect("/load");
});

app.get("/load", async (req, res) => {
    const { success, message, data } = await getAllLists();
    if (success) res.json({ status: 200, message, data });
    else res.json({ status: 400, message, data: null });
});

app.get("/delete", async (req, res) => {});

app.get("/dropdb", async (req, res) => {
    await dropDB();
    res.redirect("/load");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
