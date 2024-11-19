export default function SimpleInput({placeholder, value, onChange}) {
    return (
        <input
            className="m-1 p-2 w-full font-bold text-xl text-black text-left bg-transparent outline-none border-slate-600 "
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            autoComplete="off"
        />
    )
}