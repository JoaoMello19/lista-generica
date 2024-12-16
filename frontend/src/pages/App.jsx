import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import TopBanner from "../components/TopBanner";
import Container from "../components/Container";
import DefaultForm from "../components/DefaultForm";
import VerticalContainer from "../components/VerticalContainer";
import { protectedScope } from "../utils/utils";

export default function App() {
    const [lists, setLists] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            protectedScope(async () => {
                const response = await fetch("http://localhost:4000/lists");
                const data = await response.json();
                if (!response.ok) throw new Error(data.error);

                setLists(data.lists);
            }, "Erro ao buscar listas");
        })();
    }, []);

    async function addList(event) {
        event.preventDefault();
        const name = event.target.txtInput.value;
        if (!name) return;

        protectedScope(async () => {
            const response = await fetch("http://localhost:4000/lists", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error);

            setLists((prev) => [...prev, data.list]);
            event.target.txtInput.value = "";
        }, "Erro ao inserir lista");
    }

    async function onDeleteListClick(listId) {
        if (window.confirm("Deseja excluir esta lista?")) {
            protectedScope(async () => {
                const response = await fetch(
                    `http://localhost:4000/lists/${listId}`,
                    { method: "DELETE" }
                );
                const data = await response.json();
                if (!response.ok) throw new Error(data.error);

                setLists((prev) => prev.filter((list) => list.id !== listId));
            }, "Erro ao excluir lista");
        }
    }

    function onListClick(list) {
        return navigate(`/list/${list.id}`);
    }

    return (
        <Container>
            <TopBanner text="Meu App de Listas" />
            <VerticalContainer
                objects={lists}
                onBannerClick={onListClick}
                onDeleteClick={onDeleteListClick}
                content={(list) =>
                    `${list.name} (${list.items.length} ${
                        list.items.length !== 1 ? "items" : "item"
                    })`
                }
            />
            <DefaultForm
                onSubmit={addList}
                placeholder={"Nova lista"}
                buttonText={"CRIAR"}
            />
        </Container>
    );
}
