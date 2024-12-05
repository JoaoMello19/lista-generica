export default function NewListForm({ onSubmit }) {
    return (
        <form
            onSubmit={onSubmit}
            className="w-[60vh] max-w-[90vw] mx-auto flex flex-row bg-white rounded-md"
        >
            <input
                type="text"
                name="listName"
                className="w-4/5 pl-3 rounded-l-md outline-none"
                placeholder="Nome da lista"
                autoComplete="off"
            />
            <button
                type="submit"
                className="w-1/5 px-4 py-2 rounded-r-md text-white font-bold bg-green-800"
            >
                CRIAR
            </button>
        </form>
    );
}
