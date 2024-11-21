import ListBanner from "./ListBanner";
import { useState } from "react";
import SimpleContainer from "../SimpleContainer";
import SimpleInputBar from "../SimpleInputBar";

export default function ListContainer({ lists, insertList, deleteList }) {
    const [showInput, setShowInput] = useState(false);
    const [newListTitle, setNewListTitle] = useState("");

    async function addList() {
        await insertList(newListTitle);
        setNewListTitle("");
        setShowInput(false);
    }

    return (
        <SimpleContainer>
            {lists.map((list) => (
                <ListBanner
                    key={list.listId}
                    list={list}
                    deleteList={deleteList}
                />
            ))}

            {showInput && (
                <SimpleInputBar
                    placeholder="Nome da lista"
                    value={newListTitle}
                    onChange={(e) => setNewListTitle(e.target.value)}
                    onClick={addList}
                />
            )}

            <button
                className="mx-auto mt-5 py-2 px-4 font-bold text-white text-xl bg-slate-700 rounded-md"
                onClick={() => {
                    setShowInput(true);
                }}
            >
                Criar nova lista
            </button>
        </SimpleContainer>
    );
}
