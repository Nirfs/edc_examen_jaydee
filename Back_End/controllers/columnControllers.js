const { randomUUID } = require("crypto");
const Column = require("../models/Column");
const { Columns: column } = require("../data/initData");

function getColumns(req, res) {
  res.status(200).json(column);
}

function getColumnById(req, res) {
  const ColumnID = req.params.id;
  const col = column.find((c) => c.id === ColumnID);
  if (!col) {
    return res.status(404).json({ error: "Aucune colonne trouvée" });
  }
  res.status(200).json(col);
}

function createColumn(req, res, next) {
  try {
    const { name, color, boardId, key } = req.body;
    if (!name || typeof name !== "string" || name.trim() === "") {
      return res
        .status(400)
        .json({ error: "Le nom est requis et doit être une chaîne non vide" });
    }
    if (!color || typeof color !== "string" || color.trim() === "") {
      return res.status(400).json({
        error: "La couleur est requise et doit être une chaîne non vide",
      });
    }
    if (!boardId || typeof boardId !== "string" || boardId.trim() === "") {
      return res.status(400).json({
        error: "Le boardId est requis et doit être une chaîne non vide",
      });
    }
    if (!key || typeof key !== "string" || key.trim() === "") {
      return res
        .status(400)
        .json({ error: "La clé est requise et doit être une chaîne non vide" });
    }
    const newColumn = new Column(randomUUID(), name, color, boardId, key);
    column.push(newColumn);
    res.status(201).json(newColumn);
  } catch (err) {
    next(err);
  }
}

function modifyColumn(req, res) {
  const columnId = req.params.id;
  const { name, color, key } = req.body;
  const col = column.find((c) => c.id === columnId);
  if (!col) {
    return res.status(404).json({ error: "Aucune colonne trouvée" });
  }
  if (!name || typeof name !== "string" || name.trim() === "") {
    return res
      .status(400)
      .json({ error: "Le nom est requis et doit être une chaîne non vide" });
  }
  if (!color || typeof color !== "string" || color.trim() === "") {
    return res.status(400).json({
      error: "La couleur est requise et doit être une chaîne non vide",
    });
  }
  if (!key || typeof key !== "string" || key.trim() === "") {
    return res
      .status(400)
      .json({ error: "La clé est requise et doit être une chaîne non vide" });
  }
  col.name = name.trim();
  col.color = color.trim();
  col.key = key.trim();
  res.json(col);
}

function deleteColumn(req, res) {
  const columnId = req.params.id;
  const columnIndex = column.findIndex((col) => col.id === columnId);
  if (columnIndex === -1) {
    return res.status(404).json({ error: "Aucune colonne trouvée" });
  }
  column.splice(columnIndex, 1);
  res.status(204).send();
}

module.exports = {
  getColumns,
  getColumnById,
  createColumn,
  modifyColumn,
  deleteColumn,
};
