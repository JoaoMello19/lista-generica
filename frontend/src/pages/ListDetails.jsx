import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import TopBanner from "../components/TopBanner";
import ListItemContainer from "../components/listitems/ListItemContainer";
import SimpleContainer from "../components/SimpleContainer";
import ListItemBanner from "../components/listitems/ListItemBanner";

export default function ListDetails() {
    const [list, setList] = useState([]);
    const [searchParams] = useSearchParams();
    const listId = searchParams.get("listId");

    useEffect(() => {
        async function getList(listId) {
            const query = new URLSearchParams();
            query.set("listId", listId);
            const response = await fetch(`http://localhost:3000/loadlist`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ listId }),
            });
            const data = await response.json();
            if (data.status === 200) return setList(data.data);
            else return null;
        }
        getList(listId);
    }, []);

    function insertItem(listId, itemTitle) {
        async function _insertItem() {
            const response = await fetch(`http://localhost:3000/insertitem`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ listId, itemTitle }),
            });
            const data = await response.json();
            if (data.status === 200) {
                setList((prevList) => ({
                   ...prevList,
                    items: [...prevList.items, data.data],
                }));
            } else window.alert(data.message);
        }
        _insertItem();
    }

    return (
        <div className="w-screen h-screen bg-slate-300">
            <TopBanner title={list.title} showBackButton={true} />
            <ListItemContainer list={list} insertItem={insertItem} />
        </div>
    );
}
