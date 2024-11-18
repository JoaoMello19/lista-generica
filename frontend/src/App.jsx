import { useEffect, useState } from "react";
import ListContainer from "./components/ListContainer";

function App() {
    const [lists, setLists] = useState([]);

    useEffect(() => {
        async function fetchLists() {
            const response = await fetch("http://localhost:3000/load", {
                method: "POST",
            });
            const data = await response.json();
            if (data.status === 200) setLists(data.data);
        }
        fetchLists();
    }, []);

    async function onListClick(listId) {
        const query = new URLSearchParams();
        query.set("listId", listId);
        navigate(`/list?${query.toString()}`);
    }

    return (
        <div className="w-screen h-screen bg-slate-300">
            <div className="flex flex-row justify-center p-5 bg-slate-800 text-white">
                <h1 className="m-auto text-2xl font-bold">Meu App de Listas</h1>
            </div>
            <ListContainer lists={lists} />
        </div>
    );
}

export default App;
