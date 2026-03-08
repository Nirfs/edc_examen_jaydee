import { useParams } from "react-router";

export function BoardByID() {
  const { id } = useParams<{ id: string }>();
  return (
    <div>
      <h1>{`Board ${id}`}</h1>
    </div>
  );
}
