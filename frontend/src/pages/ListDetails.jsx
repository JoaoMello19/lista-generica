import { useParams } from "react-router-dom";
import Container from "../components/Container";
import TopBanner from "../components/TopBanner";
import { useEffect, useState } from "react";
import ItemContainer from "../components/ItemContainer";
import NewItemForm from "../components/NewItemForm";

export default function ListDetails() {
    const { id } = useParams();
    const [list, setList] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        async function getList() {
            await fetch(`http://localhost:4000/lists/${id}`)
                .then((response) => {
                    if (!response.ok) throw new Error("Erro ao buscar lista");
                    return response.json();
                })
                .then(({ list }) => {
                    setList(list);
                })
                .catch((error) => {
                    console.error(
                        `Erro ao buscar lista ${id}: ${error.message}`
                    );
                });
        }
        getList();
    }, []);

    async function addItem(event) {
        event.preventDefault();

        const text = event.target.itemText.value;
        if (!text) return;

        await fetch("http://localhost:4000/items", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ text, listId: list.id }),
        })
            .then(async (response) => {
                if (!response.ok) throw new Error("Erro ao buscar lista");
                return response.json();
            })
            .then(({ item }) => {
                setList((prev) => {
                    const updatedList = [...prev.items, item];
                    return { ...prev, items: updatedList };
                });
            })
            .catch((error) => {
                console.error(`Erro ao inserir item: ${error.message}`);
            });
        event.target.itemText.value = "";
    }

    async function onItemClick(item) {
        await fetch(`http://localhost:4000/items/${item.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ done: !item.done }),
        })
            .then(async (response) => response.json())
            .then(({ item }) => {
                setList((prev) => {
                    const updatedList = prev.items.map((i) =>
                        i.id === item.id ? { ...i, done: !i.done } : i
                    );
                    return { ...prev, items: updatedList };
                });
            });
    }

    async function onDeleteItemClick(itemId) {
        await fetch(`http://localhost:4000/items/${itemId}`, {
            method: "DELETE",
        })
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error(`Erro ao excluir item ${itemId}`);
                }
                console.log(`Item ${itemId} excluído`);
                setList((prev) => {
                    const updatedList = prev.items.filter(
                        (i) => i.id !== itemId
                    );
                    return { ...prev, items: updatedList };
                });
            })
            .catch((error) => {
                console.error(
                    `Erro ao excluir item ${itemId}: ${error.message}`
                );
            });
    }

    function handleTitleClick() {
        setIsEditing(true);
    }

    async function handleTitleChange(evt) {
        setList((prev) => {
            return { ...prev, name: evt.target.value };
        });
    }

    async function handleBlur(evt) {
        await fetch("http://localhost:4000/lists/" + list.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: evt.target.value,
            }),
        })
            .then((response) => {
                if (!response.ok) throw new Error("Erro ao salvar nome");
                return response.json();
            })
            .then(({ list }) => {
                setList(list);
            })
            .catch((error) => {
                console.error(`Erro ao salvar nome: ${error.message}`);
                setList((prev) => ({ ...prev, name: prev.name })); // Reset the title to its original value if saving fails.
                setIsEditing(false);
            });
        setIsEditing(false);
    }

    async function handleKeyDown(evt) {
        if (evt.key === "Enter") handleBlur(evt);
    }

    return (
        <Container>
            <TopBanner text="Meu App de Listas" />
            <div className="flex flex-row gap-3 w-[60vh] max-w-[95vw] mx-auto">
                {isEditing ? (
                    <input
                        type="text"
                        autoComplete="off"
                        className="w-full text-xl font-bold text-center bg-transparent"
                        value={list?.name || ""}
                        onChange={handleTitleChange}
                        onBlur={handleBlur}
                        onKeyDown={handleKeyDown}
                        autoFocus
                    />
                ) : (
                    <h2
                        className="w-full text-xl font-bold text-center"
                        onClick={handleTitleClick}
                    >
                        {list?.name || ""}
                    </h2>
                )}
            </div>
            <ItemContainer
                items={(list && list.items) || []}
                onItemClick={onItemClick}
                onDeleteItemClick={onDeleteItemClick}
            />
            <NewItemForm onSubmit={addItem}></NewItemForm>
        </Container>
    );
}
