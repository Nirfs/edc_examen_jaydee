const VALID_PRIORITIES = ["low", "medium", "high"];

class Task {
  constructor(
    id,
    title,
    description,
    columnKey,
    taskType,
    taskTypecolor,
    priority,
    priorityColor,
  ) {
    if (typeof id !== "string" || id.trim() === "") {
      throw new Error("id doit être une chaîne non vide");
    }
    if (typeof title !== "string" || title.trim() === "") {
      throw new Error("title doit être une chaîne non vide");
    }
    if (typeof description !== "string") {
      throw new Error("description doit être une chaîne");
    }
    if (typeof taskType !== "string" || taskType.trim() === "") {
      throw new Error("taskType doit être une chaîne non vide");
    }
    if (typeof columnKey !== "string" || columnKey.trim() === "") {
      throw new Error("columnKey doit être une chaîne non vide");
    }
    if (typeof taskTypecolor !== "string" || taskTypecolor.trim() === "") {
      throw new Error("taskTypecolor doit être une chaîne non vide");
    }
    if (!VALID_PRIORITIES.includes(priority)) {
      throw new Error(
        "priority doit être l'une des valeurs : " + VALID_PRIORITIES.join(", "),
      );
    }
    if (typeof priorityColor !== "string" || priorityColor.trim() === "") {
      throw new Error("priorityColor doit être une chaîne non vide");
    }

    this.id = id;
    this.title = title.trim();
    this.description = description;
    this.taskType = taskType;
    this.columnKey = columnKey;
    this.taskTypecolor = taskTypecolor;
    this.priority = priority;
    this.priorityColor = priorityColor;
  }
}

module.exports = Task;
