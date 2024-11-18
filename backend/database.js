import { connect, Schema, model } from "mongoose";

/** CONEXÃO COM O BANCO DE DADOS */
connect("mongodb://localhost:27017/listadb")
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });

/** DEFINIÇÃO DOS SCHEMAS E MODELS */
const listItemSchema = new Schema({
    title: { type: String, required: true },
    done: { type: Boolean, default: false },
});

const ListItem = model("ListItem", listItemSchema);

const listSchema = new Schema({
    title: { type: String, required: true },
    items: { type: [listItemSchema], required: false },
});

const List = model("List", listSchema);

/** FUNÇÕES SOBRE O MODEL ListItem */

async function insertListItem(title) {
    try {
        const newItem = new ListItem({ title });
        await newItem.save();
        return {
            success: true,
            message: "Item da lista criada com sucesso",
            data: newItem,
        };
    } catch (err) {
        return {
            success: false,
            message: "Erro ao criar item da lista: " + err.message,
            data: null,
        };
    }
}

async function deleteListItem(id) {
    await ListItem.findByIdAndDelete(id);
}

/** FUNÇÕES SOBRE O MODEL List */
async function insertList(title) {
    try {
        const newList = new List({ title });
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

async function getList(id) {
    const list = await List.findById(id);
    if (!list)
        return {
            success: false,
            message: `Lista(${id}) não encontrada`,
            data: null,
        };
    return { success: true, message: "Lista retornada sucesso", data: list };
}

async function getAllLists() {
    const lists = await List.find({});
    return {
        success: true,
        message: "Listas retornadas com sucesso",
        data: lists,
    };
}

async function addItemToList(itemTitle, listId) {
    try {
        const { success } = await createListItem(itemTitle);
        if (!success) throw new Error(data);

        const updatedList = await List.findByIdAndUpdate(
            listId,
            { $push: { items: { title: itemTitle } } },
            { new: true }
        );

        return {
            success: true,
            message: "Item adicionado a lista com sucesso",
            data: updatedList,
        };
    } catch (err) {
        return {
            success: false,
            message: "Erro ao adicionar item à lista: " + err.message,
            data: null,
        };
    }
}

async function deleteList(id) {
    try {
        await List.findByIdAndDelete(id);
    } catch (err) {
        return {
            success: false,
            message: "Erro ao excluir lista: " + err.message,
        };
    }
    return {
        success: true,
        message: "Lista excluída com sucesso!",
    };
}

/** FUNCÕES DE DEV */

async function dropDB() {
    await ListItem.deleteMany({});
    await List.deleteMany({});
    return { success: true, message: "Banco de dados limpo!" };
}

export {
    insertListItem,
    deleteListItem,
    insertList,
    getList,
    getAllLists,
    addItemToList,
    deleteList,
    dropDB,
};
