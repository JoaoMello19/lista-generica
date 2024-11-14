import { useSearchParams } from "react-router-dom";

export default function ListItems() {
    const [searchParams] = useSearchParams();
    const ID = searchParams.get('id');

    return <div></div>;
}
