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
