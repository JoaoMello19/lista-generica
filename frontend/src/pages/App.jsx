import { useState } from "react";
import Container from "../components/Container";
import ListContainer from "../components/ListContainer";
import NewListForm from "../components/NewListForm";
import TopBanner from "../components/TopBanner";

export default function App() {
    // const [lists, setLists] = useState([]);
    const [lists, setLists] = useState([
        {
            id: 1,
            name: "Shopping List",
            color: "#FF5733",
            created_at: "2024-12-01T10:00:00Z",
            items: [
                {
                    id: 1,
                    text: "Buy milk",
                    done: false,
                    created_at: "2024-12-01T10:10:00Z",
                },
                {
                    id: 2,
                    text: "Buy eggs",
                    done: true,
                    created_at: "2024-12-01T10:15:00Z",
                },
                {
                    id: 3,
                    text: "Buy bread",
                    done: false,
                    created_at: "2024-12-01T10:20:00Z",
                },
            ],
        },
        {
            id: 2,
            name: "Work Tasks",
            color: "#4287f5",
            created_at: "2024-12-02T09:00:00Z",
            items: [
                {
                    id: 4,
                    text: "Finish report",
                    done: true,
                    created_at: "2024-12-02T09:30:00Z",
                },
                {
                    id: 5,
                    text: "Email client",
                    done: false,
                    created_at: "2024-12-02T10:00:00Z",
                },
                {
                    id: 6,
                    text: "Prepare slides",
                    done: false,
                    created_at: "2024-12-02T11:00:00Z",
                },
            ],
        },
    ]);

    function addList(event) {
        event.preventDefault();
        const name = event.target.listName.value;
        if (!name) return;

        console.log("New list:", name);
        // setLists([...lists, { id: Date.now(), name, color: "#FF5733", items: [] }]);
        setLists([
            ...lists,
            { id: Date.now(), name, color: "#000000", items: [] },
        ]);

        event.target.listName.value = "";
    }

    function onDeleteListClick() {
        console.log("Delete clicked");
    }

    return (
        <Container>
            <TopBanner />
            <ListContainer
                lists={lists}
                onDeleteListClick={onDeleteListClick}
            />
            <NewListForm onSubmit={addList} />
        </Container>
    );
}
