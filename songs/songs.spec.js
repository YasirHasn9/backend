const request = require("supertest");
const server = require("../api/server");
const Songs = require("./songs-models");
const db = require("../db/db-config");

beforeEach(async () => {
  await db("songs").truncate();
});

describe("The Songs model", () => {
  it("GET /songs", async () => {
    const res = await request(server).get("/api/songs");
    expect(res.status).toBe(200);
  });
  
  it("list of songs", async () => {
    await Songs.add({ title: "Hello", song_by: "Adele" });
    await Songs.add({ title: "Set On fire", song_by: "Adele" });
    const res = await Songs.find();
    expect(res.length).toBeGreaterThan(1);
  });
  it("list of songs", async () => {
    const data = { title: "hello", song_by: "adele" };
    const res = await Songs.add(data);
    expect(res.title).toBe("hello");
  });
});
