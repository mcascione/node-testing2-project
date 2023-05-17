const db = require("../../data/dbConfig");
// const request = require("supertest");
// const server = require("./server");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db.seed.run();
});

test("environment is testing", () => {
  expect(process.env.NODE_ENV).toBe("testing");
});
