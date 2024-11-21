import { TrashIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SimpleBanner from "../SimpleBanner";

export default function ListBanner({ list, deleteList }) {
    const navigate = useNavigate();
    function onBannerClick() {
        const query = new URLSearchParams();
        query.set("listId", list.listId);
        navigate(`/list?${query.toString()}`);
    }

    const length = list.items.length;

    return (
        <SimpleBanner
            className="bg-amber-400"
            buttonClassName="text-amber-800"
            onBannerClick={onBannerClick}
            bannerTitle={`${list.title} (${length} ${
                length === 1 ? "item" : "itens"
            })`}
            onButtonClick={() => {
                deleteList(list.listId);
            }}
        />
    );
}
