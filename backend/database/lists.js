const { List, Item } = require("./models");

function validateListId(listId) {
    return listId && typeof listId === "number" && listId > 0;
}

async function insertList(name) {
    try {
        if (!name) throw new Error("Nome da lista inválido");

        const newList = await List.create({ name });
        const { success, data, error } = await getListById(newList.id);
        if (!success) throw new Error(error);

        return { success: true, data };
    } catch (error) {
        console.error("insertList:", error.message);
        return { success: false, error: error.message };
    }
}

async function getAllLists() {
    try {
        const lists = await List.findAll({ include: Item });
        return { success: true, data: lists };
    } catch (error) {
        console.error("getAllLists:", error.message);
        return { success: false, error: error.message };
    }
}

async function getListById(listId) {
    try {
        if (!validateListId(listId)) throw new Error("ID da lista inválido");

        const list = await List.findByPk(listId, { include: Item });
        if (!list) throw new Error("Lista não encontrada");

        return { success: true, data: list };
    } catch (error) {
        console.error("getListById:", error.message);
        return { success: false, error: error.message };
    }
}

async function getLists(where) {
    try {
        const lists = await List.findAll({ where, include: Item });
        return { success: true, data: lists };
    } catch (error) {
        console.error("getLists:", error.message);
        return { success: false, error: error.message };
    }
}

async function getListByName(name) {
    try {
        if (!name) throw new Error("Nome da lista inválido");
        const lists = await getLists({ name });
        return { success: true, data: lists };
    } catch (error) {
        console.error("getListByName:", error.message);
        return { success: false, error: error.message };
    }
}

async function updateListById(listId, name) {
    try {
        if (!validateListId(listId)) throw new Error("ID da lista inválido");
        if (!name) throw new Error("Nome da lista inválido");

        const [rowsUpdated] = await List.update(
            { name },
            { where: { id: listId } }
        );
        if (rowsUpdated === 0)
            throw new Error("Nenhuma lista encontrada com o ID fornecido.");

        const updatedList = await List.findByPk(listId, { include: Item });
        return {
            success: true,
            data: updatedList,
        };
    } catch (error) {
        console.error("updateListById:", error.message);
        return { success: false, error: error.message };
    }
}

async function deleteListById(listId) {
    try {
        if (!validateListId(listId)) throw new Error("ID da lista inválido");
        await List.destroy({ where: { id: listId } });
        return { success: true };
    } catch (error) {
        console.error("deleteListById:", error.message);
        return { success: false, error: error.message };
    }
}

module.exports = {
    insertList,
    getAllLists,
    getListById,
    getListByName,
    updateListById,
    deleteListById,
};
