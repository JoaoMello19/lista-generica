import { useEffect, useState } from "react";
import ListContainer from "./components/lists/ListContainer";
import TopBanner from "./components/TopBanner";

function App() {
    const [lists, setLists] = useState([]);

    // carregamento da lista pelo backend
    useEffect(() => {
        async function fetchLists() {
            const response = await fetch("http://localhost:3000/getall", {
                method: "POST",
            });
            const data = await response.json();
            if (data.status === 200) setLists(data.data);
        }
        fetchLists();
    }, []);

    async function insertList(listTitle) {
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
        await _insertList();
    }

    async function deleteList(listId) {
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
                setLists(lists.filter((list) => list.listId !== listId));
            else window.alert(data.message);
        }
        await _deleteList(listId);
    }

    return (
        <div className="w-screen h-screen bg-slate-300">
            <TopBanner title="Meu App de Listas" />
            <ListContainer
                lists={lists}
                insertList={insertList}
                deleteList={deleteList}
            />
        </div>
    );
}

export default App;
