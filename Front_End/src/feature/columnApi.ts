import type { columnType } from "../type/type";

const BASE_URL = "http://localhost:3000/api";

//--- Fetch recupère tout les Colonnes ---
export async function getColumns(): Promise<columnType[]> {
  try {
    const res = await fetch(`${BASE_URL}/columns`);
    if (!res.ok) throw new Error("Impossible de récupérer les colonnes");
    return await res.json();
  } catch (e) {
    if (e instanceof Error) throw e;
    return [];
  }
}

//--- Fetch récupère une Colonne par ID ---
export async function getColumnById(id: string): Promise<columnType | null> {
  try {
    const res = await fetch(`${BASE_URL}/columns/${id}`);
    if (!res.ok) throw new Error("Colonne introuvable");
    return await res.json();
  } catch (e) {
    if (e instanceof Error) throw e;
    return null;
  }
}

//--- Fetch récupère les Colonnes par Board ID ---
export async function getColumnsByBoardId(
  boardId: string,
): Promise<columnType[]> {
  try {
    const res = await fetch(`${BASE_URL}/columns`);
    if (!res.ok) throw new Error("Impossible de récupérer les colonnes");
    const data: columnType[] = await res.json();
    return data.filter((col) => col.boardId === boardId);
  } catch (e) {
    if (e instanceof Error) throw e;
    return [];
  }
}
