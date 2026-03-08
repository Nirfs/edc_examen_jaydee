const { randomUUID } = require("crypto");
const Task = require("../models/Tasks");
const { Tasks: tasks } = require("../data/initData");

function getTasks(req, res) {
  res.status(200).json(tasks);
}

function getTaskById(req, res) {
  const taskId = req.params.id;
  const task = tasks.find((t) => t.id === taskId);
  if (!task) {
    return res.status(404).json({ error: "Aucune tâche trouvée" });
  }
  res.status(200).json(task);
}

function createTask(req, res, next) {
  try {
    const {
      title,
      description = "",
      columnKey,
      taskType,
      taskTypecolor,
      priority,
      priorityColor,
    } = req.body;

    const newTask = new Task(
      randomUUID(),
      title,
      description,
      columnKey,
      taskType,
      taskTypecolor,
      priority,
      priorityColor,
    );
    tasks.push(newTask);
    res.status(201).json(newTask);
  } catch (e) {
    next(e);
  }
}

function modifyTask(req, res, next) {
  try {
    const taskId = req.params.id;
    const task = tasks.find((t) => t.id === taskId);
    if (!task) {
      return res.status(404).json({ error: "Aucune tâche trouvée" });
    }

    const {
      title,
      description,
      columnKey,
      taskType,
      taskTypecolor,
      priority,
      priorityColor,
    } = req.body;

    if (title !== undefined) task.title = title.trim();
    if (description !== undefined) task.description = description;
    if (columnKey !== undefined) task.columnKey = columnKey;
    if (taskType !== undefined) task.taskType = taskType;
    if (taskTypecolor !== undefined) task.taskTypecolor = taskTypecolor;
    if (priority !== undefined) task.priority = priority;
    if (priorityColor !== undefined) task.priorityColor = priorityColor;

    res.status(200).json(task);
  } catch (e) {
    next(e);
  }
}

function deleteTask(req, res) {
  const taskId = req.params.id;
  const taskIndex = tasks.findIndex((t) => t.id === taskId);
  if (taskIndex === -1) {
    return res.status(404).json({ error: "Aucune tâche trouvée" });
  }
  tasks.splice(taskIndex, 1);
  res.status(204).send();
}

module.exports = { getTasks, getTaskById, createTask, modifyTask, deleteTask };
