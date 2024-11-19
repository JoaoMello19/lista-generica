import { TrashIcon } from "lucide-react";
import SimpleBanner from "../SimpleBanner";

export default function ListItemBanner({ listItem, deleteListItem }) {
    function onBannerClick() {}

    return (
        <SimpleBanner
            className="py-0 bg-slate-100 border-2 border-slate-800"
            buttonClassName={listItem.done && "line-through"}
            onBannerClick={onBannerClick}
            bannerTitle={listItem.title}
            onButtonClick={() => {
                deleteListItem(listItem._id);
            }}
        />
    );
}
