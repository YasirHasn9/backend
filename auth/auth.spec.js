const request = require("supertest");
const server = require("../api/server");

const db = require("../db/db-config");
const Users = require("../users/users-models");

beforeEach(async () => {
  await db("users").truncate();
});

describe("Auth router", () => {
  const user = {
    username: "Yasir",
    password: "password"
  };
  it("returns the created user from database and 201 /register", async () => {
    const res = await request(server)
      .post("/api/auth/register")
      .send(user);
    expect(res.body.user.id).toBeDefined();
    expect(res.body.user.username).toBe("Yasir");
    expect(res.body.token).toBeDefined();
    expect(res.statusCode).toBe(201);
  });

  describe("POST /login", () => {
    it("should return 200", async () => {
       await request(server)
        .post("/api/auth/register")
        .send(user)
  
        const login = await request(server).post("/api/auth/login").send(user)
        expect(login.status).toBe(200);
        expect(login.body.token).toBeDefined()

    });
  });
});
