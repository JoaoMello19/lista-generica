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
            listTitle = listTitle.trim();
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

    function deleteList(listId) {
        async function _deleteList(listId) {
            const response = await fetch(`http://localhost:3000/deletelist`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ listId }),
            });
            const data = await response.json();
            if (data.status === 200)
                setLists(lists.filter((list) => list._id !== listId));
            else window.alert(data.message);
        }
        _deleteList(listId);
    }

    return (
        <div className="w-screen h-screen bg-slate-300">
            <div className="flex flex-row justify-center p-5 bg-slate-800 text-white">
                <h1 className="m-auto text-2xl font-bold">Meu App de Listas</h1>
            </div>
            <ListContainer
                lists={lists}
                insertList={insertList}
                deleteList={deleteList}
            />
        </div>
    );
}

export default App;
