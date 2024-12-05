export default function TopBanner({ text }) {
    return (
        <div className="w-full p-3 bg-slate-700">
            <h1 className="text-center text-2xl text-white font-bold">
                {text}
            </h1>
        </div>
    );
}
