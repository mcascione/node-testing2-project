const db = require("../../data/dbConfig");
const Plant = require("./plants-model");

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

describe("getAll", () => {
  test("resolves all the plants in a table", async () => {
    const result = await Plant.getAll();
    console.log(result);
    expect(result).toHaveLength(3);
    expect(result[0]).toMatchObject({
      name: "basil",
      family: "Lamiaceae",
      purchased: 1,
    });
    expect(result[1]).toMatchObject({
      name: "Meyer lemon tree",
      family: "Rutaceae",
      purchased: 0,
    });
    expect(result[2]).toMatchObject({
      name: "avocado tree",
      family: "Lauraceae",
      purchased: 0,
    });
  });
});

describe("getByID", () => {
  test("resolves the plant by the given ID", async () => {
    let result;
    result = await Plant.getByID(1);
    expect(result).toMatchObject({
      name: "basil",
      family: "Lamiaceae",
      purchased: 1,
    });
    result = await Plant.getByID(2);
    expect(result).toMatchObject({
      name: "Meyer lemon tree",
      family: "Rutaceae",
      purchased: 0,
    });
    result = await Plant.getByID(3);
    expect(result).toMatchObject({
      name: "avocado tree",
      family: "Lauraceae",
      purchased: 0,
    });
  });
});

describe("insert", () => {
  const teaRose = { name: "tea rose", family: "Rosaceae", purchased: 1 };
  test("resolves the newly created plant", async () => {
    const result = await Plant.insert(teaRose);
    expect(result).toMatchObject(teaRose);
  });
  test("adds the plant to the plants table", async () => {
    await Plant.insert(teaRose);
    const table = await db("plants");
    expect(table).toHaveLength(4);
  });
});

describe("update", () => {
  const changes = {
    name: "avocado tree",
    family: "Lauraceae",
    purchased: 1,
  };
  test("resolves the update plant", async () => {
    const result = await Plant.update(3, changes);
    expect(result).toMatchObject(changes);
  });
  test("replaces the correct plant with the updated plant in the plants table", async () => {
    await Plant.update(3, changes);
    const updatedPlant = await db("plants").where("id", 3).first();
    expect(updatedPlant).toMatchObject(changes);
  });
});
