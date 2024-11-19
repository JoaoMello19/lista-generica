import { TrashIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SimpleBanner from "../SimpleBanner";

export default function ListBanner({ list, deleteList }) {
    const navigate = useNavigate();
    function onBannerClick() {
        const query = new URLSearchParams();
        query.set("listId", list._id);
        navigate(`/list?${query.toString()}`);
    }

    return (
        <SimpleBanner
            className="bg-slate-600"
            buttonClassName="text-white"
            onBannerClick={onBannerClick}
            bannerTitle={`${list.title} (${list.items.length} itens)`}
            onButtonClick={() => {
                deleteList(list._id);
            }}
        />
    );
}
