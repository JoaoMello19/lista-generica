import { SquareCheckIcon, SquareIcon, TrashIcon } from "lucide-react";

function ItemBanner({ item, onItemClick, onDeleteItemClick }) {
    return (
        <div className="flex">
            <button
                className={`flex h-full w-full p-3 text-left rounded-l-md font-semibold overflow-hidden text-ellipsis whitespace-nowrap bg-white`}
                onClick={() => {
                    onItemClick(item);
                }}
            >
                {item.done ? (
                    <SquareCheckIcon className="mr-3" />
                ) : (
                    <SquareIcon className="mr-3" />
                )}
                {item.text}
            </button>
            <button
                className="min-w-fit aspect-square bg-red-600 rounded-r-md"
                onClick={() => {
                    onDeleteItemClick(item.id);
                }}
            >
                <TrashIcon className="m-auto text-white" size={30} />
            </button>
        </div>
    );
}

export default function ItemContainer({
    items,
    onItemClick,
    onDeleteItemClick,
}) {
    return (
        <div
            className="w-[60vh] max-w-[95vw] mx-auto flex flex-col gap-2"
            style={{ display: items?.length > 0 ? "flex" : "none" }}
        >
            {items.map((item) => (
                <ItemBanner
                    key={item.id}
                    item={item}
                    onItemClick={onItemClick}
                    onDeleteItemClick={onDeleteItemClick}
                />
            ))}
        </div>
    );
}
