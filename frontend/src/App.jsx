import { useEffect, useState } from "react";
import ListContainer from "./components/ListContainer";

function App() {
    const [lists, setLists] = useState([]);

    // carregamento da lista pelo backend
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

    function insertList(listTitle) {
        async function _insertList() {
            if (!listTitle) return;
            const response = await fetch("http://localhost:3000/insertlist", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ listTitle }),
            });
            const data = await response.json();
            if (data.status === 200) setLists([...lists, data.data]);
            else window.alert(data.message);
        }
        _insertList();
    }

    return (
        <div className="w-screen h-screen bg-slate-300">
            <div className="flex flex-row justify-center p-5 bg-slate-800 text-white">
                <h1 className="m-auto text-2xl font-bold">Meu App de Listas</h1>
            </div>
            <ListContainer lists={lists} insertList={insertList} />
        </div>
    );
}

export default App;
