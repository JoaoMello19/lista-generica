import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { SquareCheckIcon, SquareIcon } from "lucide-react";

import Container from "../components/Container";
import TopBanner from "../components/TopBanner";
import DefaultForm from "../components/DefaultForm";
import VerticalContainer from "../components/VerticalContainer";
import { protectedScope } from "../utils/utils";

export default function ListDetails() {
    const { id } = useParams();
    const [list, setList] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        (() => {
            protectedScope(async () => {
                const response = await fetch(
                    `http://localhost:4000/lists/${id}`
                );
                const data = await response.json();
                if (!response.ok) throw new Error(data.error);

                setList(data.list);
            }, "Erro ao buscar lista e itens");
        })();
    }, []);

    async function addItem(event) {
        event.preventDefault();

        const text = event.target.txtInput.value;
        if (!text) return;

        protectedScope(async () => {
            const response = await fetch("http://localhost:4000/items", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text, listId: list.id }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error);

            setList((prev) => {
                const updatedList = [...prev.items, data.item];
                return { ...prev, items: updatedList };
            });
        }, "Erro ao adicionar item");

        event.target.txtInput.value = "";
    }

    async function onItemClick(item) {
        protectedScope(async () => {
            const response = await fetch(
                `http://localhost:4000/items/${item.id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ done: !item.done }),
                }
            );
            const data = await response.json();
            if (!response.ok) throw new Error(data.error);

            setList((prev) => {
                const updatedList = prev.items.map((i) =>
                    i.id === item.id ? { ...i, done: !i.done } : i
                );
                return { ...prev, items: updatedList };
            });
        }, "Erro ao alterar item");
    }

    async function onDeleteItemClick(itemId) {
        protectedScope(async () => {
            const response = await fetch(
                `http://localhost:4000/items/${itemId}`,
                { method: "DELETE" }
            );
            const data = await response.json();
            if (!response.ok) throw new Error(data.error);

            setList((prev) => {
                const updatedList = prev.items.filter((i) => i.id !== itemId);
                return { ...prev, items: updatedList };
            });
        }, "Erro ao excluir item");
    }

    /* Funções da mudança de titulo */
    function handleTitleClick() {
        setIsEditing(true);
    }

    async function handleTitleChange(evt) {
        setList((prev) => {
            return { ...prev, name: evt.target.value };
        });
    }

    async function handleBlur(evt) {
        protectedScope(async () => {
            const response = await fetch(
                `http://localhost:4000/lists/${list.id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name: evt.target.value,
                    }),
                }
            );
            const data = await response.json();
            if (!response.ok) throw new Error(data.error);

            setList(data.list);
        }, "Erro ao alterar nome da lista");

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
            <VerticalContainer
                objects={list?.items}
                onBannerClick={onItemClick}
                onDeleteClick={onDeleteItemClick}
                content={(item) => {
                    return (
                        <>
                            {item.done ? (
                                <SquareCheckIcon className="mr-3" />
                            ) : (
                                <SquareIcon className="mr-3" />
                            )}
                            {item.text}
                        </>
                    );
                }}
            />
            <DefaultForm
                onSubmit={addItem}
                placeholder={"Novo item"}
                buttonText={"ADICIONAR"}
            />
        </Container>
    );
}
