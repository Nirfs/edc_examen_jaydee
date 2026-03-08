class Board {
  constructor(id, name, dateCreated) {
    if (typeof id !== "string" || id.trim() === "") {
      throw new Error("id doit être une chaîne non vide");
    }
    if (typeof name !== "string" || name.trim() === "") {
      throw new Error("name doit être une chaîne non vide");
    }
    if (!(dateCreated instanceof Date) || isNaN(dateCreated)) {
      throw new Error("dateCreated doit être une Date valide");
    }

    this.id = id;
    this.name = name.trim();
    this.dateCreated = dateCreated;
  }
}

module.exports = Board;
