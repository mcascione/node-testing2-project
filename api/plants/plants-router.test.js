const db = require("../../data/dbConfig");
const request = require("supertest");
const server = require("../server");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db.seed.run();
});

describe("[GET] /plants", () => {
  test("responds with 200 ok", async () => {
    const res = await request(server).get("/plants");
    expect(res.status).toBe(200);
  });
  test("responds with all the plants", async () => {
    const res = await request(server).get("/plants");
    expect(res.body).toHaveLength(3);
  });
});

describe("[GET] /plants/:id", () => {
  test("responds with 200 ok", async () => {
    const res = await request(server).get("/plants/1");
    expect(res.status).toBe(200);
  });
  test("responds with the plant that matches the id", async () => {
    const res = await request(server).get("/plants/1");
    expect(res.body).toMatchObject({
      id: 1,
      name: "basil",
      family: "Lamiaceae",
      purchased: 1,
    });
  });
});

describe("[POST] /plants", () => {
  const grapefruitTree = {
    name: "grapefruit tree",
    family: "Rutaceae",
    purchased: 0,
  };
  test("responds with a 201 created", async () => {
    const res = await request(server).post("/plants").send(grapefruitTree);
    expect(res.status).toBe(201);
  });
  test("responds with the plant that was created", async () => {
    const res = await request(server).post("/plants").send(grapefruitTree);
    expect(res.body).toMatchObject(grapefruitTree);
  });
});

describe("[PUT] /plants/:id", () => {
  const updatedPlant = {
    name: "Hass avocado tree",
    family: "Lauraceae",
    purchased: 0,
  };
  test("responds with a 200 ok status", async () => {
    const res = await request(server).put("/plants/2").send(updatedPlant);
    expect(res.status).toBe(200);
  });
  test("responds with the updated plant", async () => {
    const res = await request(server).put("/plants/2").send(updatedPlant);
    expect(res.body).toMatchObject(updatedPlant);
  });
});

describe("[DELETE] /plants/:id", () => {
  test("responds with a 200 ok", async () => {
    const res = await request(server).delete("/plants/3");
    expect(res.status).toBe(200);
  });
  test("responds with a message confirming deletion", async () => {
    const res = await request(server).delete("/plants/2");
    expect(res.body.message).toContain("2");
  });
});
