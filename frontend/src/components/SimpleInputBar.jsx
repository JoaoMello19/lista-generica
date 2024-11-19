import SimpleInput from "./SimpleInput";

export default function SimpleInputBar({
    placeholder,
    value,
    onChange,
    onClick,
}) {
    return (
        <div className="flex mt-5 w-full rounded-xl bg-white">
            <SimpleInput
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            <button
                className="py-2 px-4 rounded-md rounded-l-none font-bold bg-slate-700 text-white"
                onClick={onClick}
            >
                ADICIONAR
            </button>
        </div>
    );

    /*
    <SimpleInputBar
        placeholder="Nome da lista"
        value={newListTitle}
        onChange={(e) => setNewListTitle(e.target.value)}
        onClick={addList}
    />


    <SimpleInputBar
        placeholder="Novo item"
        value={newItemTitle}
        onChange={(e) => setNewItemTitle(e.target.value)}
        onClick={addItem}
    />
    
    */
}
