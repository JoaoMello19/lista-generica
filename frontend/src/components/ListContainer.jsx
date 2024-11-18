import ListBanner from "./ListBanner";
import { useState } from "react";

export default function ListContainer({ lists, insertList, deleteList }) {
    const [showInput, setShowInput] = useState(false);
    const [newListTitle, setNewListTitle] = useState("");

    async function addList() {
        insertList(newListTitle);
        setNewListTitle("");
        setShowInput(false);
    }

    return (
        <section className="mx-auto my-3 flex flex-col gap-2 w-2/5 h-max">
            {lists.map((list) => (
                <ListBanner
                    key={list._id}
                    list={list}
                    deleteList={deleteList}
                />
            ))}

            {showInput && (
                <div className="flex mt-5 w-full rounded-xl bg-white">
                    <input
                        className="m-1 p-2 w-full font-bold text-xl text-black text-left bg-transparent outline-none border-slate-600 "
                        type="text"
                        placeholder="Nome da lista"
                        value={newListTitle}
                        onChange={(e) => setNewListTitle(e.target.value)}
                        autoComplete="off"
                    />
                    <button
                        className="py-2 px-4 rounded-md rounded-l-none font-bold bg-slate-700 text-white"
                        onClick={addList}
                    >
                        ADICIONAR
                    </button>
                </div>
            )}

            <button
                className="mx-auto mt-5 py-2 px-4 font-bold text-white text-xl bg-slate-700 rounded-md"
                onClick={() => {
                    setShowInput(true);
                }}
            >
                Criar nova lista
            </button>
        </section>
    );
}
