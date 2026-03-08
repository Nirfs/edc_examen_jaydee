const request = require("supertest");
const app = require("../app");

const validColumn = {
  name: "Nouvelle Colonne",
  color: "#6366F1",
  boardId: "1",
  key: "nouvelle",
};

describe("GET /api/columns", () => {
  test("retourne 200 et un tableau", async () => {
    const res = await request(app).get("/api/columns");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe("GET /api/columns/:id", () => {
  test("retourne 200 et une colonne valide", async () => {
    const createRes = await request(app).post("/api/columns").send(validColumn);
    const id = createRes.body.id;

    const res = await request(app).get(`/api/columns/${id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("name");
    expect(typeof res.body.id).toBe("string");
    expect(typeof res.body.name).toBe("string");
  });

  test("retourne 404 si aucune colonne n'existe", async () => {
    const res = await request(app).get("/api/columns/un_id_faux");
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("error", "Aucune colonne trouvée");
  });
});

describe("POST /api/columns", () => {
  test("retourne 201 a la création de la colonne", async () => {
    const res = await request(app).post("/api/columns/").send(validColumn);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe(validColumn.name);
  });

  test("retourne 400 si name est une chaîne vide", async () => {
    const res = await request(app)
      .post("/api/columns")
      .send({ ...validColumn, name: "" });
    expect(res.statusCode).toBe(400);
  });

  test("retourne 400 si name est absent", async () => {
    const res = await request(app).post("/api/columns").send({});
    expect(res.statusCode).toBe(400);
  });
});

describe("PUT /api/columns/:id", () => {
  test("mise a jour d'une colonne", async () => {
    const res = await request(app).post("/api/columns/").send({
      name: "Ancien nom",
      color: "#6B7280",
      boardId: "1",
      key: "ancien",
    });

    const id = res.body.id;

    const updateRes = await request(app).put(`/api/columns/${id}`).send({
      name: "Nouveau nom",
      color: "#22C55E",
      key: "nouveau",
    });

    expect(updateRes.statusCode).toBe(200);
    expect(updateRes.body.name).toBe("Nouveau nom");
  });

  test("retourne 404 si la colonne n'existe pas", async () => {
    const res = await request(app)
      .put("/api/columns/faux_id")
      .send({ name: "Peu importe", color: "#fff", key: "key" });
    expect(res.statusCode).toBe(404);
  });
});

describe("DELETE /api/columns/:id", () => {
  test("supression des données", async () => {
    const createRes = await request(app)
      .post("/api/columns/")
      .send(validColumn);

    const id = createRes.body.id;

    const res = await request(app).delete(`/api/columns/${id}`);
    expect(res.statusCode).toBe(204);
  });

  test("retourne 404 si colonne inexistante", async () => {
    const res = await request(app).delete("/api/columns/faux_id");
    expect(res.statusCode).toBe(404);
  });
});
