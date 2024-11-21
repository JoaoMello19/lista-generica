import { connect, Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

/** CONEXÃO COM O BANCO DE DADOS */
connect("mongodb://localhost:27017/listadb")
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });

/** DEFINIÇÃO DOS SCHEMAS E MODELS */
const listSchema = new Schema({
    listId: { type: String, required: true, unique: true },
    title: { type: String, required: true, trim: true, minlength: 1 },
    items: [
        {
            itemId: { type: String, required: true, sparse: true },
            title: { type: String, required: true },
            done: { type: Boolean, default: false },
        },
    ],
});

const List = model("List", listSchema);

/** FUNÇÕES SOBRE O MODEL List */
async function insertList(title) {
    try {
        const listId = uuidv4();
        console.log("ID gerado para nova lista:", listId);
        const newList = new List({
            listId,
            title,
        });
        await newList.save();

        return {
            success: true,
            message: "Lista criada com sucesso",
            data: newList,
        };
    } catch (err) {
        return {
            success: false,
            message: "Erro ao criar lista: " + err.message,
            data: null,
        };
    }
}

async function getList(listId) {
    try {
        const list = await List.findOne({ listId });
        if (!list) throw new Error(`Lista(${listId}) não encontrada`);

        return {
            success: true,
            message: "Lista retornada sucesso",
            data: list,
        };
    } catch (err) {
        return {
            success: false,
            message: "Erro ao buscar lista: " + err.message,
            data: null,
        };
    }
}

async function getAllLists() {
    try {
        const allLists = await List.find({});
        return {
            success: true,
            message: `${allLists.length} listas retornadas com sucesso`,
            data: allLists,
        };
    } catch (err) {
        return {
            success: false,
            message: "Erro ao buscar todas as listas: " + err.message,
            data: null,
        };
    }
}

async function deleteList(listId) {
    try {
        await List.deleteOne({ listId });
        return {
            success: true,
            message: "Lista excluída com sucesso!",
            data: null,
        };
    } catch (err) {
        return {
            success: false,
            message: "Erro ao excluir lista: " + err.message,
            data: null,
        };
    }
}

async function addItemToList(listId, itemTitle) {
    try {
        const list = await List.findOne({ listId });
        if (!list) throw new Error(`Lista(${listId}) não encontrada`);

        const newItem = {
            itemId: uuidv4(),
            title: itemTitle,
            done: false,
        };

        list.items.push(newItem);
        await list.save();
        return {
            success: true,
            message: "Item adicionado a lista com sucesso",
            data: newItem,
        };
    } catch (err) {
        return {
            success: false,
            message: "Erro ao adicionar item à lista: " + err.message,
            data: null,
        };
    }
}

async function toggleItem(listId, itemId) {
    try {
        const list = await List.findOne({ listId, "items.itemId": itemId });
        if (!list) throw new Error(`Lista(${listId}) não encontrado`);

        const item = list.items.find((item) => item.itemId === itemId);
        if (!item) throw new Error(`Item(${itemId}) não encontrado`);

        await List.updateOne(
            { listId, "items.itemId": itemId }, // Filtro
            { $set: { "items.$.done": !item.done } } // Alterna o valor
        );

        return {
            success: true,
            message: "Item marcado como concluído com sucesso!",
            data: list.items.find((item) => item.itemId === itemId),
        };
    } catch (err) {
        return {
            success: false,
            message: "Erro ao marcar item como concluído: " + err.message,
            data: null,
        };
    }
}

async function deleteItem(listId, itemId) {
    try {
        const list = await List.findOneAndUpdate(
            { listId },
            { $pull: { items: { itemId } } },
            { new: true }
        );
        if (!list) throw new Error(`Item(${itemId}) não encontrado`);

        return {
            success: true,
            message: "Item excluído da lista com sucesso!",
            data: null,
        };
    } catch (err) {
        return {
            success: false,
            message: "Erro ao excluir item da lista: " + err.message,
            data: null,
        };
    }
}

/** FUNCÕES DE DEV */

async function dropDB() {
    await List.deleteMany({});
    return { success: true, message: "Banco de dados limpo!" };
}

export {
    insertList,
    getList,
    getAllLists,
    deleteList,
    addItemToList,
    toggleItem,
    deleteItem,
    dropDB,
};
