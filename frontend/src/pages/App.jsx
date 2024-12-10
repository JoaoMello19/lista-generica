import { useEffect, useState } from "react";
import Container from "../components/Container";
import ListContainer from "../components/ListContainer";
import NewListForm from "../components/NewListForm";
import TopBanner from "../components/TopBanner";

export default function App() {
    const [lists, setLists] = useState([]);
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        async function getLists() {
            await fetch("http://localhost:4000/lists/")
                .then((response) => {
                    if (!response.ok) throw new Error("Erro ao buscar listas");
                    return response.json();
                })
                .then(({ lists }) => {
                    setLists(lists);
                })
                .catch((error) => {
                    console.error(error);
                    setLists([]);
                });
        }
        getLists();
    }, [update]);

    async function addList(event) {
        event.preventDefault();
        const name = event.target.listName.value;
        if (!name) return;

        await fetch("http://localhost:4000/lists", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name }),
        })
            .then(async (response) => {
                if (!response.ok) throw new Error(data.error);
                return response.json();
            })
            .then(({ list, message }) => {
                setLists((prev) => [...prev, list]);
            })
            .catch((err) => {
                console.error("Erro ao inserir lista: " + err.message);
            })
            .finally(() => {
                event.target.listName.value = "";
            });
    }

    function onDeleteListClick(listId) {
        if (window.confirm("Deseja excluir esta lista?")) {
            fetch(`http://localhost:4000/lists/${listId}`, {
                method: "DELETE",
            })
                .then(async (response) => {
                    const data = await response.json();
                    if (!response.ok) throw new Error(data.error);
                    setUpdate((prev) => !prev);
                })
                .catch((err) => {
                    console.error("Erro ao excluir lista: " + err.message);
                });
        }
    }

    return (
        <Container>
            <TopBanner text="Meu App de Listas" />
            <ListContainer
                lists={lists}
                onDeleteListClick={onDeleteListClick}
            />
            <NewListForm onSubmit={addList} />
        </Container>
    );
}
