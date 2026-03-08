import type { columnType } from "../type/type";

type Priority = "low" | "medium" | "high";

type InputTaskModalProps = {
  onSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => void;
  onClose: () => void;
  taskTitle: string;
  setTaskTitle: (value: string) => void;
  taskDescription: string;
  setTaskDescription: (value: string) => void;
  taskColumnKey: string;
  setTaskColumnKey: (value: string) => void;
  taskType: string;
  setTaskType: (value: string) => void;
  taskTypecolor: string;
  setTaskTypeColor: (value: string) => void;
  priority: Priority;
  setPriority: (value: Priority) => void;
  columns: columnType[];
  formError?: string;
  isCreatingTask: boolean;
  taskTypeColors: string[];
  variant?: "create" | "modify";
};

export function InputTaskModal({
  onSubmit,
  onClose,
  taskTitle,
  setTaskTitle,
  taskDescription,
  setTaskDescription,
  taskColumnKey,
  setTaskColumnKey,
  taskType,
  setTaskType,
  taskTypecolor,
  setTaskTypeColor,
  priority,
  setPriority,
  columns,
  formError,
  isCreatingTask,
  taskTypeColors,
  variant,
}: InputTaskModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={isCreatingTask ? () => null : onClose}
    >
      <div
        className="w-full max-w-md rounded-md bg-white p-5 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-4 text-lg font-bold">
          {variant === "create" ? "Ajouter une tâche" : "Modifier une tâche"}
        </h2>

        <form onSubmit={onSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            placeholder="Titre"
            className="w-full rounded-md border border-gray-300 px-3 py-2"
          />

          {formError && <p className="text-sm text-red-500">{formError}</p>}

          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            placeholder="Description"
            className="w-full rounded-md border border-gray-300 px-3 py-2"
          />

          <select
            value={taskColumnKey}
            onChange={(e) => setTaskColumnKey(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2"
          >
            {columns.map((col) => (
              <option key={col.id} value={col.key}>
                {col.name}
              </option>
            ))}
          </select>

          <select
            value={taskType}
            onChange={(e) => setTaskType(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2"
          >
            <option value="feature">feature</option>
            <option value="bug">bug</option>
            <option value="chore">chore</option>
          </select>

          <div>
            <p className="mb-2 text-sm font-semibold">Couleur du type</p>
            <div className="flex flex-wrap gap-2">
              {taskTypeColors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setTaskTypeColor(color)}
                  aria-label={`Choisir ${color}`}
                  className={`h-8 w-8 rounded-full border-2 transition ${
                    taskTypecolor === color
                      ? "scale-110 border-black"
                      : "border-transparent"
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <select
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value as "low" | "medium" | "high")
            }
            className="w-full rounded-md border border-gray-300 px-3 py-2"
          >
            <option value="low">low</option>
            <option value="medium">medium</option>
            <option value="high">high</option>
          </select>

          <div className="mt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-gray-300 px-3 py-2 text-sm"
              disabled={isCreatingTask ? true : false}
            >
              Annuler
            </button>

            <button
              type="submit"
              disabled={isCreatingTask}
              className="rounded-md bg-secondary px-3 py-2 text-sm font-semibold text-white disabled:opacity-70"
            >
              {isCreatingTask
                ? "Sauvegarde..."
                : variant === "modify"
                  ? "Modifier"
                  : "Créer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
