import { type SubmitEventHandler, useEffect, useState } from "react";
import { createBoard, getBoards } from "../feature/boardApi";
import type { boardsType } from "../types/type";
import { Board } from "../components/Board";

export function AllBoards() {
  const [boards, setBoards] = useState<boardsType[]>([]);
  const [load, setLoad] = useState(true);
  const [newBoardName, setNewBoardName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchBoards() {
    try {
      const data = await getBoards();
      setBoards(data);
      setError(null);
    } catch (err) {
      console.error("Erreur lors de la récupération des boards :", err);
      setError("Impossible de charger les boards");
    } finally {
      setLoad(false);
    }
  }
  useEffect(() => {
    fetchBoards();
  }, []);

  const handleCreateBoard: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!newBoardName.trim()) {
      setError("Le nom du board est requis");
      return;
    }

    try {
      setIsCreating(true);
      await createBoard({ name: newBoardName.trim() });
      setNewBoardName("");
      await fetchBoards();
    } catch (err) {
      console.error("Erreur lors de la création du board :", err);
      setError("Impossible de créer le board");
    } finally {
      setIsCreating(false);
    }
  };

  if (load) return <p>Chargement ...</p>;

  return (
    <div>
      <header className="bg-white rounded-md p-5 w-full mb-5">
        <h1 className="text-xl font-bold">Liste des projets</h1>
      </header>

      <form
        onSubmit={handleCreateBoard}
        className="mb-5 flex flex-col gap-3 rounded-md bg-white p-5"
      >
        <label htmlFor="new-board" className="font-semibold">
          Ajouter un board
        </label>
        <div className="flex gap-3">
          <input
            id="new-board"
            type="text"
            value={newBoardName}
            onChange={(e) => setNewBoardName(e.target.value)}
            placeholder="Nom du board"
            className="w-full rounded-md border border-gray-300 px-3 py-2"
          />
          <button
            type="submit"
            disabled={isCreating}
            className="rounded-md bg-secondary px-4 py-2 font-semibold text-white disabled:opacity-70"
          >
            {isCreating ? "Création..." : "Ajouter"}
          </button>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>

      <div className="flex flex-col gap-5">
        {boards.map((b) => (
          <Board key={b.id} board={b} />
        ))}
      </div>
    </div>
  );
}
