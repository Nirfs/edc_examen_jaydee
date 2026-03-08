const { randomUUID } = require("crypto");
const Board = require("../models/Boards");
const { Boards: boards } = require("../data/initData");

function getBoards(req, res) {
  res.status(200).json(boards);
}

function getBoardById(req, res) {
  const boardId = req.params.id;
  const board = boards.find((board) => board.id === boardId);
  if (!board) {
    return res.status(404).json({ error: "Aucun board trouvé" });
  }
  res.status(200).json(board);
}

function createBoard(req, res, next) {
  try {
    const { name } = req.body;
    if (!name || typeof name !== "string" || name.trim() === "") {
      return res
        .status(400)
        .json({ error: "Le nom est requis et doit être une chaîne non vide" });
    }
    const newBoard = new Board(randomUUID(), name, new Date());
    boards.push(newBoard);
    res.status(201).json(newBoard);
  } catch (err) {
    next(err);
  }
}

function modifyBoard(req, res) {
  const boardId = req.params.id;
  const { name } = req.body;
  const board = boards.find((board) => board.id === boardId);
  if (!board) {
    return res.status(404).json({ error: "Aucun board trouvé" });
  }
  if (!name || typeof name !== "string" || name.trim() === "") {
    return res
      .status(400)
      .json({ error: "Le nom est requis et doit être une chaîne non vide" });
  }
  board.name = name.trim();
  res.json(board);
}

function deleteBoard(req, res) {
  const boardId = req.params.id;
  const boardIndex = boards.findIndex((board) => board.id === boardId);
  if (boardIndex === -1) {
    return res.status(404).json({ error: "Aucun board trouvé" });
  }
  boards.splice(boardIndex, 1);
  res.status(204).send();
}

module.exports = {
  getBoards,
  getBoardById,
  createBoard,
  modifyBoard,
  deleteBoard,
};
