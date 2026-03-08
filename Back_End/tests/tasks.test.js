const request = require("supertest");
const app = require("../app");

const validTask = {
  title: "Nouvelle Tâche",
  description: "Description de test",
  columnKey: "todo",
  taskType: "feature",
  taskTypecolor: "#6366F1",
  priority: "medium",
  priorityColor: "#FFA500",
};

describe("GET /api/tasks", () => {
  test("retourne 200 et un tableau", async () => {
    const res = await request(app).get("/api/tasks");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe("GET /api/tasks/:id", () => {
  test("retourne 200 et une tâche valide", async () => {
    const createRes = await request(app).post("/api/tasks").send(validTask);
    const id = createRes.body.id;

    const res = await request(app).get(`/api/tasks/${id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("title");
    expect(res.body).toHaveProperty("description");
    expect(res.body).toHaveProperty("columnKey");
    expect(res.body).toHaveProperty("taskType");
    expect(res.body).toHaveProperty("taskTypecolor");
    expect(res.body).toHaveProperty("priority");
    expect(res.body).toHaveProperty("priorityColor");
    expect(typeof res.body.id).toBe("string");
    expect(typeof res.body.title).toBe("string");
    expect(typeof res.body.description).toBe("string");
    expect(typeof res.body.columnKey).toBe("string");
    expect(typeof res.body.taskType).toBe("string");
    expect(typeof res.body.taskTypecolor).toBe("string");
    expect(typeof res.body.priority).toBe("string");
    expect(typeof res.body.priorityColor).toBe("string");
  });

  test("retourne 404 si aucune tâche n'existe", async () => {
    const res = await request(app).get("/api/tasks/un_id_faux");
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("error", "Aucune tâche trouvée");
  });
});

describe("POST /api/tasks", () => {
  test("retourne 201 a la création de la tâche", async () => {
    const res = await request(app).post("/api/tasks/").send(validTask);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.title).toBe(validTask.title);
  });

  test("retourne 400 si title est une chaîne vide", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .send({ ...validTask, title: "" });
    expect(res.statusCode).toBe(400);
  });

  test("retourne 400 si title est absent", async () => {
    const res = await request(app).post("/api/tasks").send({});
    expect(res.statusCode).toBe(400);
  });
});

describe("PUT /api/tasks/:id", () => {
  test("mise a jour d'une tâche", async () => {
    const res = await request(app)
      .post("/api/tasks/")
      .send({
        ...validTask,
        title: "Ancien titre",
      });

    const id = res.body.id;

    const updateRes = await request(app)
      .put(`/api/tasks/${id}`)
      .send({
        ...validTask,
        title: "Nouveau titre",
      });

    expect(updateRes.statusCode).toBe(200);
    expect(updateRes.body.title).toBe("Nouveau titre");
  });

  test("retourne 404 si la tâche n'existe pas", async () => {
    const res = await request(app).put("/api/tasks/faux_id").send(validTask);
    expect(res.statusCode).toBe(404);
  });
});

describe("DELETE /api/tasks/:id", () => {
  test("supression des données", async () => {
    const createRes = await request(app).post("/api/tasks").send(validTask);

    const id = createRes.body.id;

    const res = await request(app).delete(`/api/tasks/${id}`);
    expect(res.statusCode).toBe(204);
  });

  test("retourne 404 si tâche inexistante", async () => {
    const res = await request(app).delete("/api/tasks/faux_id");
    expect(res.statusCode).toBe(404);
  });
});
