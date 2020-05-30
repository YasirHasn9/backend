const db = require("../db/db-config");
const server = require("../api/server");
const request = require("supertest");
const Users = require("./users-models");

describe("test", () => {
  it(" Get protect endpoint /api/users should return 401", async () => {
    const res = await request(server).get("/api/users");
    expect(res.status).toBe(401);
  });
  it("add users", async () => {
    const user = await Users.add({
      username: "YasirHassan",
      password: "password"
    });
    console.log("this is yasir", user);
    expect(user.id).toBeTruthy();
    expect(user.username).toBe("YasirHassan");
  });
  it("find list of users ", async () => {
    const users = await Users.find();
    console.log("this is users", users);
    expect(users.length).toBeGreaterThanOrEqual(1);
  });
});
