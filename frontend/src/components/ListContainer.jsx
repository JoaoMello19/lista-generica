import { TrashIcon } from "lucide-react";

export default function ListContainer({ lists, onDeleteListClick }) {
    function onColorClick(listId) {
        console.log("Color clicked", listId);
    }

    function onListClick(listId) {
        console.log("List clicked", listId);
    }

    return (
        <div className="w-[60vh] mx-auto flex flex-col gap-2">
            {lists.map((list) => (
                <div key={list.id} className="flex">
                    <button
                        className={`h-full aspect-[3/4] rounded-l-md`}
                        style={{ backgroundColor: list.color }}
                        onClick={() => {
                            onColorClick(list.id);
                        }}
                    ></button>
                    <button
                        className={`w-full p-3 text-left font-semibold bg-white`}
                        style={{ color: list.color }}
                        onClick={() => {
                            onListClick(list.id);
                        }}
                    >
                        {`${list.name} (${list.items.length} ${
                            list.items.length !== 1 ? "items" : "item"
                        })`}
                    </button>
                    <button
                        className="aspect-square bg-red-600 rounded-r-md"
                        onClick={onDeleteListClick}
                    >
                        <TrashIcon className="m-auto text-white" size={30} />
                    </button>
                </div>
            ))}
        </div>
    );
}
