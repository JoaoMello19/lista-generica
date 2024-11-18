import { PlusIcon } from "lucide-react";
import ListBanner from "./ListBanner";

export default function ListContainer({ lists }) {
    return (
        <section className="mx-auto my-3 flex flex-col gap-2 w-2/5 h-max">
            {lists.map((list) => (
                <ListBanner key={list._id} listTitle={list.title} />
            ))}

            <button className="mx-auto my-5 text-white text-5xl bg-slate-700 rounded-full">
                <PlusIcon className="w-16 h-16 m-2" />
            </button>
        </section>
    );
}
