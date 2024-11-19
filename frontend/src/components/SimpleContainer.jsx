export default function SimpleContainer({ children }) {
    return (
        <section className="mx-auto my-3 flex flex-col gap-2 w-[600px] max-w-[90vw] h-max">
            {children}
        </section>
    );
}
