import express from "express";

const PORT = 3000;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({ status: 200, message: "API padrão" });
});

app.post("/saveList", (req, res) => {
    res.json({ status: 200, message: "API de inserção" });
});

app.post("/load", (req, res) => {
    res.json({ status: 200, message: "API de carregamento" });
});

app.delete("/delete", (req, res) => {
    res.json({ status: 200, message: "API de remoçao" });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
