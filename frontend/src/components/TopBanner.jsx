import { MoveLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TopBanner({ title, showBackButton }) {
    const navigate = useNavigate();
    return (
        <div className="relative flex items-center justify-center p-5 bg-blue-900 text-white">
            {showBackButton && (
                <button
                    className="absolute max-w-[20%] aspect-[3/2] left-5 flex flex-row gap-2 justify-center items-center px-3 rounded-md text-white bg-blue-500"
                    onClick={() => {
                        navigate(-1);
                    }}
                >
                    <MoveLeftIcon className="h-12 w-12" />
                    {/* <span className="text-xl font-bold">voltar</span> */}
                </button>
            )}
            <h1 className="m-auto max-w-[50%] text-2xl font-bold text-center overflow-hidden text-ellipsis whitespace-nowrap">{title}</h1>
        </div>
    );
}
