import { MoveLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TopBanner({ title, showBackButton }) {
    const navigate = useNavigate();
    return (
        <div className="relative flex items-center justify-center p-5 bg-slate-800 text-white">
            {showBackButton && (
                <button
                    className="absolute left-5 flex flex-row gap-2"
                    onClick={() => {
                        navigate(-1);
                    }}
                >
                    <MoveLeftIcon />
                    <span>voltar</span>
                </button>
            )}
            <h1 className="m-auto text-2xl font-bold text-center">{title}</h1>
        </div>
    );
}
