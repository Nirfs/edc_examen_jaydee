import { Link } from "react-router-dom";
import type { boardsType } from "../type/type";

type KanbanBoardProps = {
  board: boardsType;
};

export function Board({ board }: KanbanBoardProps) {
  return (
    <Link
      to={`/boards/${board.id}`}
      className="border-l-8 border-secondary bg-white rounded-md p-5 w-full cursor-pointer block"
    >
      {board.name}
    </Link>
  );
}
