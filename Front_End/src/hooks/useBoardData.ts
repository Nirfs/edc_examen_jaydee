import { useEffect, useState } from "react";
import { getBoardById } from "../feature/boardApi";
import { getColumnsByBoardId } from "../feature/columnApi";
import { getTasksByColumnKey } from "../feature/taskApi";
import type { boardsType, columnType, taskType } from "../types/type";

export function useBoardData(id: string | undefined) {
  const [board, setBoard] = useState<boardsType | null>(null);
  const [columns, setColumns] = useState<columnType[]>([]);
  const [tasks, setTasks] = useState<taskType[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchBoardAndColumns = async () => {
      setIsLoading(true);
      try {
        const boardData = await getBoardById(id);
        setBoard(boardData);
        const columnsData = await getColumnsByBoardId(id);
        setColumns(columnsData);
        const allTasks = await Promise.all(
          columnsData.map((col) => getTasksByColumnKey(col.key)),
        );
        setTasks(allTasks.flat());
      } catch (e) {
        setLoadError("Erreur lors du chargement du board");
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBoardAndColumns();
  }, [id]);

  return {
    board,
    columns,
    tasks,
    setTasks,
    loadError,
    setLoadError,
    isLoading,
  };
}
