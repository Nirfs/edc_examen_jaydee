import type { taskType } from "../type/type";

const BASE_URL = "http://localhost:3000/api";

export type CreateTaskInput = {
  title: string;
  description?: string;
  columnKey: string;
  taskType: string;
  taskTypecolor: string;
  priority: "low" | "medium" | "high";
  priorityColor: string;
};

//--- Fetch recupère tout les Tâches ---
export async function getTasks(): Promise<taskType[]> {
  try {
    const res = await fetch(`${BASE_URL}/tasks`);
    if (!res.ok) throw new Error("Impossible de récupérer les tâches");
    return await res.json();
  } catch (e) {
    if (e instanceof Error) throw e;
    return [];
  }
}

//  -- Fetch récupère une Tâche par ID ---
export async function getTaskById(id: string): Promise<taskType | null> {
  try {
    const res = await fetch(`${BASE_URL}/tasks/${id}`);
    if (!res.ok) throw new Error("Tâche introuvable");
    return await res.json();
  } catch (e) {
    if (e instanceof Error) throw e;
    return null;
  }
}

//--- Fetch récupère les Tâches par Column Key ---
export async function getTasksByColumnKey(
  columnKey: string,
): Promise<taskType[]> {
  try {
    const res = await fetch(`${BASE_URL}/tasks`);
    if (!res.ok) throw new Error("Impossible de récupérer les tâches");
    const data: taskType[] = await res.json();
    return data.filter((task) => task.columnKey === columnKey);
  } catch (e) {
    if (e instanceof Error) throw e;
    return [];
  }
}

//--- Fetch crée une Tâche ---
export async function createTask(data: CreateTaskInput): Promise<taskType> {
  const res = await fetch(`${BASE_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Impossible de créer la tâche");
  return await res.json();
}

//--- Fetch met à jour une Tâche ---
export async function updateTask(
  id: string,
  data: CreateTaskInput,
): Promise<taskType> {
  const res = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Impossible de mettre à jour la tâche");
  return await res.json();
}

//--- Fetch supprime une Tâche ---
export async function deleteTask(id: string): Promise<void> {
  try {
    const res = await fetch(`${BASE_URL}/tasks/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Impossible de supprimer la tâche");
  } catch (e) {
    if (e instanceof Error) throw e;
  }
}
