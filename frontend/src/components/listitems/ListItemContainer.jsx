import { useState } from "react";
import SimpleContainer from "../SimpleContainer";
import ListItemBanner from "./ListItemBanner";
import SimpleInputBar from "../SimpleInputBar";

export default function ListItemContainer({ list, insertItem, deleteItem }) {
    const [newItemTitle, setNewItemTitle] = useState("");

    async function addItem() {
        await insertItem(list._id, newItemTitle);
        setNewItemTitle("");
    }

    return (
        <SimpleContainer>
            {list?.items?.map((item) => {
                return (
                    <ListItemBanner
                        key={item._id || Math.random()}
                        listItem={item}
                        deleteItem={deleteItem}
                    />
                );
            })}

            <SimpleInputBar
                placeholder="Novo item"
                value={newItemTitle}
                onChange={(e) => setNewItemTitle(e.target.value)}
                onClick={addItem}
            />
        </SimpleContainer>
    );
}
