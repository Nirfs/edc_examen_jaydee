const router = require("express").Router();

const boardsControllers = require("../controllers/boardsControllers");
const columnControllers = require("../controllers/columnControllers");
const taskControllers = require("../controllers/taskControllers");

// --- Boards ---
router.get("/boards", boardsControllers.getBoards);
router.get("/boards/:id", boardsControllers.getBoardById);
router.post("/boards", boardsControllers.createBoard);
router.put("/boards/:id", boardsControllers.modifyBoard);
router.delete("/boards/:id", boardsControllers.deleteBoard);

// --- Columns ---
router.get("/columns", columnControllers.getColumns);
router.get("/columns/:id", columnControllers.getColumnById);
router.post("/columns", columnControllers.createColumn);
router.put("/columns/:id", columnControllers.modifyColumn);
router.delete("/columns/:id", columnControllers.deleteColumn);

// --- Tasks ---
router.get("/tasks", taskControllers.getTasks);
router.get("/tasks/:id", taskControllers.getTaskById);
router.post("/tasks", taskControllers.createTask);
router.put("/tasks/:id", taskControllers.modifyTask);
router.delete("/tasks/:id", taskControllers.deleteTask);

module.exports = router;
