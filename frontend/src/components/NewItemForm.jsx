export default function NewItemForm({ onSubmit }) {
    return (
        <form
            onSubmit={onSubmit}
            className="w-[60vh] max-w-[95vw] mx-auto flex flex-row bg-white rounded-md"
        >
            <input
                type="text"
                name="itemText"
                className="w-4/5 pl-3 rounded-l-md outline-none"
                placeholder="Novo item"
                autoComplete="off"
            />
            <button
                type="submit"
                className="w-1/5 min-w-fit px-4 py-2 rounded-r-md text-white font-bold bg-green-800"
            >
                ADICIONAR
            </button>
        </form>
    );
}
