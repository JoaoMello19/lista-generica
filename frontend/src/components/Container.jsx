export default function Container({ children }) {
    return (
        <div className="h-screen w-screen flex flex-col gap-6 bg-slate-100">
            {children}
        </div>
    );
}
