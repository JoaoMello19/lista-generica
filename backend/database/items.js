const { Item } = require("./models");

function validateId(listId) {
    return listId && typeof listId === "number" && listId > 0;
}

async function insertItemToList(listId, text) {
    try {
        if (!validateId(listId)) throw new Error("ID da lista inválido");
        if (!text) throw new Error("Texto do item inválido");

        const newItem = await Item.create({ text, list_id: listId });
        return { success: true, data: newItem };
    } catch (error) {
        console.error("insertItemToList:", error.message);
        return { success: false, error: error.message };
    }
}

async function getAllItemsFromList(listId) {
    try {
        if (!validateId(listId)) throw new Error("ID da lista inválido");

        const items = await Item.findAll({ where: { list_id: listId } });
        return { success: true, data: items };
    } catch (error) {
        console.error("getAllItemsFromList:", error.message);
        return { success: false, error: error.message };
    }
}

async function updateItemStatus(itemId, done) {
    try {
        if (!validateId(itemId)) throw new Error("ID da lista inválido");
        if (typeof done !== "boolean")
            throw new Error("Status do item inválido");

        const [rowsUpdated] = await Item.update(
            { done },
            { where: { id: itemId } }
        );
        if (rowsUpdated === 0)
            throw new Error("Nenhum item encontrado com o ID fornecido.");

        const updatedItem = await Item.findByPk(itemId);
        return {
            success: true,
            data: updatedItem,
        };
    } catch (error) {
        console.error("updateItemStatus:", error.message);
        return { success: false, error: error.message };
    }
}

async function removeItemFromList(listId, itemId) {
    try {
        if (!validateId(listId)) throw new Error("ID da lista inválido");
        if (!validateId(itemId)) throw new Error("ID do item inválido");

        await Item.destroy({ where: { id: itemId, list_id: listId } });
        return { success: true };
    } catch (error) {
        console.error("removeItemFromList:", error.message);
        return { success: false, error: error.message };
    }
}

module.exports = {
    insertItemToList,
    getAllItemsFromList,
    updateItemStatus,
    removeItemFromList,
};
