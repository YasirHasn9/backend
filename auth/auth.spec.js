const request = require("supertest");
const server = require("../api/server");

const db = require("../db/db-config");
const Users = require("../users/users-models");

beforeEach(async () => {
  await db("users").truncate();
});

describe("Auth router", () => {
  it("returns the created user from database", async () => {
    const user = {
      username: "Yasir",
      password: "password"
    };
    const res = await request(server)
      .post("/api/auth/register")
      .send(user);
    console.log("this is register ", res.body);
    expect(res.body.user.id).toBeDefined();
    expect(res.body.user.username).toBe("Yasir");
    expect(res.body.token).toBeDefined();
  });
});
