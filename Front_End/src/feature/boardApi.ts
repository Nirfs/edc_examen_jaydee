import type { boardsType } from "../type/type";

const BASE_URL = "http://localhost:3000/api";

type BoardBodyType = {
  name: string;
};

//--- Fetch recupère tout les Boards ---
export async function getBoards(): Promise<boardsType[]> {
  try {
    const res = await fetch(`${BASE_URL}/boards`);
    if (!res.ok) throw new Error("Impossible de se connecter a l'api");
    const data = await res.json();
    return data;
  } catch (e) {
    if (e instanceof Error) {
      throw e;
    }
    return [];
  }
}

//--- Fetch récupère un Board par ID ---
export async function getBoardById(id: string): Promise<boardsType | null> {
  try {
    const res = await fetch(`${BASE_URL}/boards/${id}`);
    if (!res.ok) throw new Error("Impossible de se connecter a l'api");
    const data = await res.json();
    return data;
  } catch (e) {
    if (e instanceof Error) {
      throw e;
    }
    return null;
  }
}

//--- Fetch crée un Board ---
export async function createBoard(BoardData: BoardBodyType) {
  try {
    const res = await fetch(`${BASE_URL}/boards`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(BoardData),
    });
    if (!res.ok) throw new Error("Impossible de se connecter a l'api");
    const data = await res.json();
    return data;
  } catch (e) {
    if (e instanceof Error) {
      throw e;
    }
    return null;
  }
}

// --- Fetch supprime un Board ---
export async function deleteBoard(id: string) {
  try {
    const res = await fetch(`${BASE_URL}/boards/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Impossible de se connecter a l'api");
    const data = await res.json();
    return data;
  } catch (e) {
    if (e instanceof Error) {
      throw e;
    }
    return null;
  }
}
