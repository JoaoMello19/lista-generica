import { useNavigate } from "react-router-dom";
import { TrashIcon } from "lucide-react";

function ListBanner({ list, onListClick, onDeleteListClick }) {
    return (
        <div className="flex">
            <button
                className={`h-full aspect-[3/4] rounded-l-md`}
                style={{ backgroundColor: list.color }}
                onClick={() => {
                    onListClick(list.id);
                }}
            />
            <button
                className={`w-full p-3 text-left font-semibold overflow-hidden text-ellipsis whitespace-nowrap bg-white`}
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
                className="min-w-fit aspect-square bg-red-600 rounded-r-md"
                onClick={() => {
                    onDeleteListClick(list.id);
                }}
            >
                <TrashIcon className="m-auto text-white" size={30} />
            </button>
        </div>
    );
}

export default function ListContainer({ lists, onDeleteListClick }) {
    const navigate = useNavigate();

    function onListClick(listId) {
        return navigate(`/list/${listId}`);
    }

    return (
        <div className="w-[60vh] max-w-[95vw] mx-auto flex flex-col gap-2">
            {lists.map((list) => (
                <ListBanner
                    key={list.id}
                    list={list}
                    onListClick={onListClick}
                    onDeleteListClick={onDeleteListClick}
                />
            ))}
        </div>
    );
}
