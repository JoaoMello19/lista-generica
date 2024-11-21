import { TrashIcon } from "lucide-react";
import SimpleBanner from "../SimpleBanner";

export default function ListItemBanner({ listItem, toggleItem, deleteItem }) {
    return (
        <SimpleBanner
            className="bg-white"
            buttonClassName={listItem.done && "line-through"}
            onBannerClick={() => {
                toggleItem(listItem.itemId);
            }}
            bannerTitle={listItem.title}
            onButtonClick={() => {
                deleteItem(listItem.itemId);
            }}
        />
    );
}
