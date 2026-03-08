const request = require("supertest");
const app = require("../www/app");

const validBoard = {
  name: "Nouveau Board",
  deadline: "2026-12-31",
};

describe("GET /api/boards", () => {
  test("retourne 200 et un tableau", async () => {
    const res = await request(app).get("/api/boards");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("retourne 200 et un board valide", async () => {
    const createRes = await request(app).post("/api/boards").send(validBoard);
    const id = createRes.body.id;

    const res = await request(app).get(`/api/boards/${id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("name");

    expect(typeof res.body.id).toBe("string");
    expect(typeof res.body.name).toBe("string");
  });

  test("retourne 404 si aucun board n'existe", async () => {
    const res = await request(app).get("/api/boards/un_id_faux");
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("error", "Aucun board trouvé");
  });
});

describe("POST /api/boards", () => {
  test("retourne 201 a la création du board", async () => {
    const res = await request(app).post("/api/boards/").send(validBoard);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe(validBoard.name);
  });

  test("retourne 400 si les données sont invalides", async () => {
    const res = await request(app).post("/api/boards").send({ name: "" });
    expect(res.statusCode).toBe(400);
  });
});

describe("PUT /api/boards/:id", () => {
  test("mise a jour d'un board", async () => {
    const res = await request(app).post("/api/boards/").send({
      name: "Ancien nom",
      deadline: "2026-12-31",
    });

    const id = res.body.id;

    const updateRes = await request(app).put(`/api/boards/${id}`).send({
      name: "Nouveau nom",
    });

    expect(updateRes.statusCode).toBe(200);
    expect(updateRes.body.name).toBe("Nouveau nom");
  });
});

describe("DELETE /api/boards/:id", () => {
  test("supression des données", async () => {
    const createRes = await request(app).post("/api/boards/").send(validBoard);

    const id = createRes.body.id;

    const res = await request(app).delete(`/api/boards/${id}`);
    expect(res.statusCode).toBe(204);
  });

  test("retourne 404 si board inexistant", async () => {
    const res = await request(app).delete("/api/boards/faux_id");
    expect(res.statusCode).toBe(404);
  });
});
