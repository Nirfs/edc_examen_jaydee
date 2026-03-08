import type { columnType, taskType } from "../types/type";
import { IoTrash, IoClose, IoSettings } from "react-icons/io5";

type TaskProps = {
  task: taskType;
  columns: columnType[];
  variant?: "card" | "modal";
  onMoveTask: (taskId: string, targetColumnKey: string) => void;
  onDeleteTask: (taskId: string) => void;
  openTask?: (taskId: string) => void;
  onClose?: () => void;
  onCLickModify?: () => void;
};

export function Task({
  task,
  columns,
  variant = "card",
  onMoveTask,
  onDeleteTask,
  openTask,
  onClose,
  onCLickModify,
}: TaskProps) {
  // Afficher les premiers caracs de l'id
  const shortTaskId = task.id.length > 7 ? task.id.slice(0, 7) : task.id;

  return (
    <div
      className="bg-white p-3 shadow-sm max-w-2xl"
      onClick={() => variant === "card" && openTask?.(task.id)}
    >
      <div className="flex flex-col text-md">
        <div className="flex justify-between">
          {` tache n°${shortTaskId}`}
          <div>
            {variant === "modal" ? (
              <div className="flex gap-2">
                <button
                  className="p-2 rounded hover:bg-gray-200 transition"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCLickModify?.();
                  }}
                >
                  <IoSettings size={20} />
                </button>

                <button
                  className="p-2 rounded hover:bg-gray-200 transition"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose?.();
                  }}
                >
                  <IoClose size={20} />
                </button>
              </div>
            ) : (
              <button
                className="p-2 rounded hover:bg-red-500 hover:text-white transition"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteTask(task.id);
                }}
              >
                <IoTrash size={20} />
              </button>
            )}
          </div>
        </div>

        <span className="flex gap-2 mt-2 text-xs font-semibold">
          <div
            className="px-3 py-1 text-black/80"
            style={{ backgroundColor: task.priorityColor }}
          >
            {task.priority}
          </div>
          <div
            className="px-3 py-1 text-black/80"
            style={{ backgroundColor: task.taskTypecolor }}
          >
            {task.taskType}
          </div>
        </span>
      </div>

      <p className="mt-6 mb-1 font-bold ">{task.title}</p>
      {task.description && (
        <p className={variant === "card" ? "text-md line-clamp-2" : "text-md"}>
          {task.description}
        </p>
      )}

      <div className="mt-4 flex items-center gap-2">
        <select
          onClick={(e) => e.stopPropagation()}
          value={task.columnKey}
          onChange={(e) => onMoveTask(task.id, e.target.value)}
          className="rounded-md border border-gray-300 px-2 py-1 text-xs"
        >
          {columns.map((col) => (
            <option key={col.id} value={col.key}>
              {col.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
