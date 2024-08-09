const app = require("../app");
const request = require("supertest");
const jwt = require("jsonwebtoken");

describe("Authenticated Endpoints", () => {
  let token;

  beforeAll(() => {
    token = jwt.sign(
      { id: "testid", email: "testemail" },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
  });

  describe("GET api/v1/users", () => {
    it("should respond with 200 status code for authenticateed request", async () => {
      const response = await request(app)
        .get("/api/v1/users")
        .set(`Authorization`, `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
    });
  });

  describe("GET api/v1/auth/authenticate", () => {
    it("should respond with 200 status code for authenticated request", async () => {
      const response = await request(app)
        .get("/api/v1/auth/authenticate")
        .set(`Authorization`, `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
    });

    it("should respond with 401 status code for request without token", async () => {
      const response = await request(app).get("/api/v1/users");

      expect(response.statusCode).toBe(401);
    });

    it("should respond with 403 status code for request with invalid token", async () => {
      const invalidToken = jwt.sign({ username: "testuser" }, "wrongsecret", {
        expiresIn: "1h",
      });

      const response = await request(app)
        .get("/api/v1/users")
        .set("Authorization", `Bearer ${invalidToken}`);

      expect(response.statusCode).toBe(403);
    });
  });
});

describe("GET api/v1/auth/login", () => {
  it("should respond with 401 status code", async () => {
    const response = await request(app).get("/api/v1/auth/login").send({
      email: "yanginicoba@email.co",
      password: "marikem",
    });
    expect(response.statusCode).toBe(401);
  });

  it("should respond with 401 status code", async () => {
    const response = await request(app).get("/api/v1/auth/login").send({
      email: "yang@email.co",
      password: "marikem",
    });
    expect(response.statusCode).toBe(401);
  });

  it("should respond with 200 status code", async () => {
    const response = await request(app).get("/api/v1/auth/login").send({
      email: "email1@gmail.com",
      password: "yanginipass1",
    });
    expect(response.statusCode).toBe(200);
  });

  it("should respond with 401 status code", async () => {
    const response = await request(app).get("/api/v1/auth/login");
    expect(response.statusCode).toBe(401);
  });
});
