import { useParams } from "react-router-dom";
import Container from "../components/Container";
import TopBanner from "../components/TopBanner";
import { useEffect, useState } from "react";
import ItemContainer from "../components/ItemContainer";

export default function ListDetails() {
    const { id } = useParams();
    const [list, setList] = useState(null);

    useEffect(() => {
        async function getList() {
            await fetch(`http://localhost:4000/lists/${id}`)
                .then((response) => response.json())
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

    async function onItemClick(item) {
        console.log(`Item ${JSON.stringify(item)} recebido`);
        await fetch(`http://localhost:4000/items/${item.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ done: !item.done }),
        })
            .then((response) => response.json())
            .then((item) => {
                console.log(
                    `Item ${item.id} atualizado com status ${!item.done}`
                );
                setList((prev) => {
                    const updatedList = prev.items.map((i) =>
                        i.id === item.id ? { ...i, done: !i.done } : i
                    );
                    return { ...prev, items: updatedList };
                });
            });
    }
    function onDeleteItemClick(item) {}

    return (
        <Container>
            <TopBanner text={(list && list.name) || ""} />
            <ItemContainer
                items={(list && list.items) || []}
                onItemClick={onItemClick}
                onDeleteItemClick={onDeleteItemClick}
            />
        </Container>
    );
}
