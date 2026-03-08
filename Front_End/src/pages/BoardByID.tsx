import { useState } from "react";
import { useParams } from "react-router";
import { deleteTask, updateTask, createTask } from "../feature/taskApi";
import { Column } from "../components/Column";
import { Task } from "../components/Task";
import { formatDate } from "../feature/utils/formatDate";
import { SearchBar } from "../components/SearchBar";
import { TaskModal } from "../components/TaskModal";
import { useBoardData } from "../hooks/useBoardData";
import type { taskType } from "../types/type";
import { Button } from "../components/Button";
import { InputTaskModal } from "../components/InputTaskModal";
import { ErrorPage } from "./ErrorPage";

export function BoardByID() {
  const { id } = useParams<{ id: string }>();
  const {
    board,
    columns,
    tasks,
    loadError,
    setTasks,
    isLoading,
    setLoadError,
  } = useBoardData(id);

  const [activeColId, setActiveColId] = useState(0);

  const [search, setSearch] = useState("");
  const [selectedTask, setSelectedTask] = useState<taskType | null>(null);
  const [showModifyTaskModal, setShowModifyTaskModal] = useState(false);
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskColumnKey, setTaskColumnKey] = useState("todo");
  const [taskType, setTaskType] = useState("feature");
  const [taskTypecolor, setTaskTypeColor] = useState("#D1D5DB");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("low");

  const [formError, setFormError] = useState<string | undefined>();
  const [isCreatingTask, setIsCreatingTask] = useState(false);

  const taskTypeColors = [
    "#6366F1",
    "#22C55E",
    "#F59E0B",
    "#EC4899",
    "#06B6D4",
    "#A855F7",
    "#EF4444",
  ];

  const priorityColor: Record<"low" | "medium" | "high", string> = {
    low: "#3CB371",
    medium: "#FFA500",
    high: "#FF4444",
  };

  // ---- Modal ----

  // Ouvre la modal de tache
  const handleOpenTask = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    setSelectedTask(task);
  };

  // Ouvre la modal de creation
  const handleOpenCreate = () => {
    setShowCreateTaskModal(true);
  };

  // Ouvre la modal de creation
  const handleOpenModify = () => {
    if (!selectedTask) return;

    setTaskTitle(selectedTask.title);
    setTaskDescription(selectedTask.description || "");
    setTaskColumnKey(selectedTask.columnKey);
    setTaskType(selectedTask.taskType);
    setTaskTypeColor(selectedTask.taskTypecolor);
    setPriority(selectedTask.priority);

    setShowModifyTaskModal(true);
  };

  const handleCloseModify = () => {
    setTaskTitle("");
    setTaskDescription("");
    setTaskColumnKey("todo");
    setTaskType("feature");
    setTaskTypeColor("#D1D5DB");
    setPriority("low");
    setFormError(undefined);

    setShowModifyTaskModal(false);
  };
  //--- Logique métier ---

  //Reset les input
  const restInput = () => {
    if (showModifyTaskModal === true) setShowModifyTaskModal(false);
    if (showCreateTaskModal === true) setShowCreateTaskModal(false);
    setSelectedTask(null);
    setTaskTitle("");
    setTaskDescription("");
    setTaskColumnKey("todo");
    setTaskType("feature");
    setTaskTypeColor("#D1D5DB");
    setPriority("low");
    setFormError(undefined);
  };

  // Filtrer les tâches
  const filteredTasks = tasks.filter((task) => {
    const searchTerm = search.toLowerCase();
    return (
      task.title.toLowerCase().includes(searchTerm) ||
      task.id.toLowerCase().includes(searchTerm) ||
      task.priority.toLowerCase().includes(searchTerm)
    );
  });

  // Création de tache
  const handleCreateTask = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!taskTitle.trim() || !taskColumnKey) {
      setFormError("Titre et colonne requis");
      return;
    }

    setIsCreatingTask(true);

    try {
      const newTask = await createTask({
        title: taskTitle,
        description: taskDescription,
        columnKey: taskColumnKey,
        taskType,
        taskTypecolor,
        priority,
        priorityColor: "#E5E7EB",
      });

      setTasks((tasks) => [...tasks, newTask]);
      restInput();
      setFormError(undefined);
    } catch (e) {
      console.error(e);
      setFormError("Erreur lors de la création");
    } finally {
      setIsCreatingTask(false);
    }
  };

  // Supression des taches
  const HandleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      const filteredTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(filteredTasks);
    } catch (e) {
      console.error(e);
      setLoadError("Erreur suppression tâche");
    }
  };

  // Déplacer une tâche
  const handleMoveTask = async (taskId: string, targetColumnKey: string) => {
    const movedTask = tasks.find((task) => task.id === taskId);
    if (!movedTask) return;
    if (movedTask.columnKey === targetColumnKey) return;

    try {
      const updatedTask = await updateTask(taskId, {
        title: movedTask.title,
        description: movedTask.description,
        columnKey: targetColumnKey,
        taskType: movedTask.taskType,
        taskTypecolor: movedTask.taskTypecolor,
        priority: movedTask.priority,
        priorityColor: movedTask.priorityColor,
      });

      setTasks((currentTasks) =>
        currentTasks.map((task) => (task.id === taskId ? updatedTask : task)),
      );
    } catch (e) {
      setLoadError("Erreur lors du déplacement de la tâche");
      console.error(e);
    }
  };

  //Modifier une tache
  const handleModifyTask = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedTask) return;

    if (!taskTitle.trim() || !taskColumnKey) {
      setFormError("Titre et colonne sont requis");
      return;
    }

    try {
      const updatedTask = await updateTask(selectedTask.id, {
        title: taskTitle.trim(),
        description: taskDescription.trim(),
        columnKey: taskColumnKey,
        taskType,
        taskTypecolor,
        priority,
        priorityColor: priorityColor[priority],
      });

      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === selectedTask.id ? updatedTask : task,
        ),
      );

      restInput();
    } catch (e) {
      setFormError("Erreur lors de la modification");
      console.error(e);
    }
  };

  //--- Erreur et chargement ---

  // Affichage des erreurs
  if (isLoading) {
    return <p>Chargement...</p>;
  }

  if (loadError) {
    return <p className="text-red-500">{loadError}</p>;
  }

  if (!board) {
    return <ErrorPage />;
  }

  return (
    <div className="flex h-full flex-col">
      <header className="mb-5 shrink-0 rounded-md bg-white p-5">
        <p>{`Date de création > ${board?.dateCreated ? formatDate(board.dateCreated) : ""}`}</p>
        <h2 className="text-xl font-bold">{board?.name}</h2>
      </header>
      <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-hidden rounded-md bg-white p-5">
        <div className="flex shrink-0 flex-col gap-3 lg:flex-row lg:items-center">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="chercher une tâche"
          />
          <div className="flex items-center gap-2">
            <Button
              variant="blue"
              onCLick={() => handleOpenCreate()}
              label="Ajouter une tâche"
            />
            <Button variant="white" label="Vue en liste" />
          </div>
        </div>
        {columns.length > 1 && (
          <div className="hidden shrink-0 sm:flex lg:hidden items-center justify-between gap-2">
            <div className="flex gap-2 overflow-x-auto">
              {columns.map((col, id) => (
                <button
                  key={col.id}
                  type="button"
                  onClick={() => setActiveColId(id)}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition ${
                    id === activeColId
                      ? "bg-[#1F2937] text-white"
                      : "border border-gray-300 text-gray-600 hover:border-gray-500"
                  }`}
                >
                  <div
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: col.color }}
                  />
                  {col.name}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="min-h-0 flex-1 grid grid-cols-1 gap-4 overflow-hidden pb-2 lg:auto-cols-[minmax(14rem,1fr)] lg:grid-cols-none lg:grid-flow-col lg:grid-rows-1 lg:overflow-x-auto lg:overflow-y-hidden lg:snap-x lg:snap-mandatory">
          {columns.map((col, idx) => (
            <div
              key={col.id}
              className={`h-full ${idx !== activeColId ? "sm:hidden lg:block" : ""}`}
            >
              <Column column={col}>
                {filteredTasks
                  .filter((t) => t.columnKey === col.key)
                  .map((task) => (
                    <Task
                      variant="card"
                      key={task.id}
                      task={task}
                      columns={columns}
                      onMoveTask={handleMoveTask}
                      onDeleteTask={HandleDeleteTask}
                      openTask={() => handleOpenTask(task.id)}
                    />
                  ))}
              </Column>
            </div>
          ))}
        </div>
      </div>

      {selectedTask && (
        <TaskModal onClose={() => setSelectedTask(null)}>
          <Task
            variant="modal"
            key={selectedTask.id}
            task={selectedTask}
            columns={columns}
            onMoveTask={handleMoveTask}
            onDeleteTask={HandleDeleteTask}
            openTask={() => null}
            onClose={() => setSelectedTask(null)}
            onCLickModify={handleOpenModify}
          />
        </TaskModal>
      )}

      {showCreateTaskModal && (
        <InputTaskModal
          onSubmit={handleCreateTask}
          onClose={() => setShowCreateTaskModal(false)}
          taskTitle={taskTitle}
          setTaskTitle={setTaskTitle}
          taskDescription={taskDescription}
          setTaskDescription={setTaskDescription}
          taskColumnKey={taskColumnKey}
          setTaskColumnKey={setTaskColumnKey}
          taskType={taskType}
          setTaskType={setTaskType}
          taskTypecolor={taskTypecolor}
          setTaskTypeColor={setTaskTypeColor}
          priority={priority}
          setPriority={setPriority}
          columns={columns}
          formError={formError}
          isCreatingTask={isCreatingTask}
          taskTypeColors={taskTypeColors}
          variant="create"
        />
      )}
      {showModifyTaskModal && (
        <InputTaskModal
          onSubmit={handleModifyTask}
          onClose={handleCloseModify}
          taskTitle={taskTitle}
          setTaskTitle={setTaskTitle}
          taskDescription={taskDescription}
          setTaskDescription={setTaskDescription}
          taskColumnKey={taskColumnKey}
          setTaskColumnKey={setTaskColumnKey}
          taskType={taskType}
          setTaskType={setTaskType}
          taskTypecolor={taskTypecolor}
          setTaskTypeColor={setTaskTypeColor}
          priority={priority}
          setPriority={setPriority}
          columns={columns}
          formError={formError}
          isCreatingTask={isCreatingTask}
          taskTypeColors={taskTypeColors}
          variant="modify"
        />
      )}
    </div>
  );
}
