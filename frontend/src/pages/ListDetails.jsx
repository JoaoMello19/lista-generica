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

    function onItemClick(item) {}
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
