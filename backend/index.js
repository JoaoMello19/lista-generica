import cors from "cors";
import express from "express";
import {
    insertList,
    getList,
    getAllLists,
    deleteList,
    addItemToList,
    toggleItem,
    deleteItem,
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

app.post("/insertlist", async (req, res) => {
    const listTitle = req.body.listTitle;
    const { success, message, data } = await insertList(listTitle);

    res.json({
        status: success ? 200 : 400,
        message,
        data,
    });
});

app.post("/getlist", async (req, res) => {
    const listId = req.body.listId;
    console.log(listId);
    if (!listId)
        return res.json({
            status: 400,
            message: "O parâmetro 'listId' é obrigatório!",
        });

    const { success, message, data } = await getList(listId);
    console.log(success, message, data);
    if (success) res.json({ status: 200, message, data });
    else res.json({ status: 400, message, data: null });
});

app.post("/getall", async (req, res) => {
    const { success, message, data } = await getAllLists();
    res.json({
        status: success ? 200 : 400,
        message,
        data,
    });
});

app.delete("/deletelist", async (req, res) => {
    const listId = req.body.listId;
    if (!listId)
        return res.json({
            status: 400,
            message: "O parâmetro 'listId' é obrigatório!",
        });

    const { success, message } = await deleteList(listId);
    res.json({
        status: success ? 200 : 400,
        message,
    });
});

app.put("/insertitem", async (req, res) => {
    const { listId, itemTitle } = req.body;
    if (!listId || !itemTitle)
        return res.json({
            status: 400,
            message: "Os parâmetros 'listId' e 'itemTitle' são obrigatórios!",
        });

    const { success, message, data } = await addItemToList(listId, itemTitle);
    res.json({
        status: success ? 200 : 400,
        message,
        data,
    });
});

app.put("/toggleitem", async (req, res) => {
    const { listId, itemId } = req.body;
    if (!listId || !itemId)
        return res.json({
            status: 400,
            message: "Os parâmetros 'listId' e 'itemId' são obrigatórios!",
        });

    const { success, message, data } = await toggleItem(listId, itemId);
    res.json({
        status: success ? 200 : 400,
        message,
        data,
    });
});

app.delete("/deleteitem", async (req, res) => {
    const { listId, itemId } = req.body;
    if (!listId || !itemId)
        return res.json({
            status: 400,
            message: "Os parâmetros 'listId' e 'itemId' são obrigatórios!",
        });

    const { success, message } = await deleteItem(listId, itemId);
    res.json({
        status: success ? 200 : 400,
        message,
    });
});

/** ============================== ROTAS DE DEV ============================== */
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
        } = await insertList(list.title);
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

app.get("/dropdb", async (req, res) => {
    await dropDB();
    res.redirect("/load");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
