import { TrashIcon } from "lucide-react";

export default function SimpleBanner({className, buttonClassName, onBannerClick, bannerTitle, onButtonClick}) {
    return (
        <div className={`flex w-full p-2 rounded-xl ${className}`}>
            <button
                className={`w-full p-2 font-bold text-xl text-left overflow-hidden text-ellipsis whitespace-nowrap ${buttonClassName}`}
                onClick={onBannerClick}
            >
                {bannerTitle}
            </button>
            <button
                className="rounded-md p-2 text-white bg-red-500"
                onClick={onButtonClick}
            >
                <TrashIcon />
            </button>
        </div>
    );
}
