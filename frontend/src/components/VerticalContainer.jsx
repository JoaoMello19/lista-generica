import { TrashIcon } from "lucide-react";

function DefaultBanner({ object, onBannerClick, onDeleteClick, content }) {
    return (
        <div className="flex">
            <button
                className={`flex h-full w-full p-3 rounded-l-md text-left font-semibold overflow-hidden text-ellipsis whitespace-nowrap bg-white`}
                onClick={() => {
                    onBannerClick(object);
                }}
            >
                {content(object)}
            </button>
            <button
                className="min-w-fit aspect-square bg-red-600 rounded-r-md"
                onClick={() => {
                    onDeleteClick(object.id);
                }}
            >
                <TrashIcon className="m-auto text-white" size={30} />
            </button>
        </div>
    );
}

export default function VerticalContainer({
    objects,
    content,
    onBannerClick,
    onDeleteClick,
}) {
    return (
        <div
            className="w-[60vh] max-w-[95vw] mx-auto flex flex-col gap-2"
            style={{ display: objects?.length > 0 ? "flex" : "none" }}
        >
            {objects?.map((object) => (
                <DefaultBanner
                    key={object.id}
                    object={object}
                    content={content}
                    onBannerClick={onBannerClick}
                    onDeleteClick={onDeleteClick}
                >
                </DefaultBanner>
            ))}
        </div>
    );
}
