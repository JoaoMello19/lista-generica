export default function ListBanner({ list, deleteList }) {
    return (
        <div className="flex w-full p-2 rounded-xl bg-slate-600">
            <button className="font-bold p-2 text-xl text-white  w-full text-left">
                {list.title}
            </button>
            <button
                className="font-bold rounded-md py-2 px-4 bg-white text-black"
                onClick={() => {
                    deleteList(list._id);
                }}
            >
                REMOVER
            </button>
        </div>
    );
}
