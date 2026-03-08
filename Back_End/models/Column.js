class Column {
  constructor(id, name, color, boardId, key) {
    if (typeof id !== "string" || id.trim() === "") {
      throw new Error("id doit être une chaîne non vide");
    }
    if (typeof name !== "string" || name.trim() === "") {
      throw new Error("name doit être une chaîne non vide");
    }
    if (typeof color !== "string" || color.trim() === "") {
      throw new Error("color doit être une chaîne non vide");
    }
    if (typeof boardId !== "string" || boardId.trim() === "") {
      throw new Error("boardId doit être une chaîne non vide");
    }
    if (typeof key !== "string" || key.trim() === "") {
      throw new Error("key doit être une chaîne non vide");
    }

    this.id = id;
    this.name = name.trim();
    this.boardId = boardId;
    this.color = color;
    this.key = key;
  }
}

module.exports = Column;
