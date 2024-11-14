import { useSearchParams } from "react-router-dom";

export default function ListItems() {
    async function getFromDB(listId) {
        const query = new URLSearchParams();
        query.set("listId", listId);
        const response = await fetch(
            `http://localhost:3000/loadlist?${query.toString()}`,
            {
                method: "POST",
            }
        );
        const data = await response.json();
    }

    const [searchParams] = useSearchParams();
    const listId = searchParams.get("listId");
    const list = getFromDB(listId);

    return <div></div>;
}
