const express = require("express");
const session = require("express-session");

const { sequelize } = require("./database/models");
const listsRoutes = require("./routes/listsRoutes");
const itemsRoutes = require("./routes/itemsRoutes");

const PORT = 4000;

async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log("Sequelize conectado com sucesso!");

        await sequelize.sync({ alter: true });
        console.log("Tabelas sincronizadas com sucesso!");
    } catch (error) {
        console.error(error.message);
    }
}
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: "your-secret-key",
        resave: false,
        saveUninitialized: true,
    })
);

app.use("/lists", listsRoutes);
app.use("/items", itemsRoutes);

app.get("/", (req, res) => {
    res.status(200).json({ message: "API padrão" });
});

app.listen(PORT, (error) => {
    if (error) {
        console.error(`Erro ao inciar servidor: ${error}`);
        process.exit(1);
    }
    console.log(`Servidor rodando na porta ${PORT}`);
});
