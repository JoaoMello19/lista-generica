function App() {
    return (
        <div className="w-screen h-screen bg-slate-300">
            <div className="flex flex-row justify-center p-5 bg-slate-800 text-white">
                <h1 className="m-auto text-2xl font-bold">Meu App de Listas</h1>
            </div>
            <section className="mx-auto my-3 flex flex-col gap-2 w-2/5 h-max">
                <div className="flex w-full p-2 rounded-xl bg-slate-600">
                    <button className="font-bold p-2 text-xl text-white  w-full text-left">
                        Lista 01
                    </button>
                    <button className="font-bold rounded-md py-2 px-4 bg-white text-black">
                        REMOVER
                    </button>
                </div>

                <div className="flex w-full p-2 rounded-xl bg-slate-600">
                    <button className="font-bold p-2 text-xl text-white  w-full text-left">
                        Lista 01
                    </button>
                    <button className="font-bold rounded-md py-2 px-4 bg-white text-black">
                        REMOVER
                    </button>
                </div>

                <div className="flex w-full p-2 rounded-xl bg-slate-600">
                    <button className="font-bold p-2 text-xl text-white  w-full text-left">
                        Lista 01
                    </button>
                    <button className="font-bold rounded-md py-2 px-4 bg-white text-black">
                        REMOVER
                    </button>
                </div>
            </section>
        </div>
    );
}

export default App;
