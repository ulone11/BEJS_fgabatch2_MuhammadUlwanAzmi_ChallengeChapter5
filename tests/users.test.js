const app = require("../app");
const request = require("supertest");
const prisma = require("../config/prisma");

let userId;

describe("POST api/v1/auth/register", () => {
  it("should respond with 400 status code", async () => {
    const response = await request(app).post("/api/v1/auth/register").send({
      name: "testingjs",
      address: "nalsiufpaweiub",
    });
    expect(response.statusCode).toBe(400);
  });

  it("should respond with 201 status code", async () => {
    const response = await request(app).post("/api/v1/auth/register").send({
      email: "aru@mail.com",
      name: "testingjs",
      password: "postini",
      phone_number: "1293712093",
      address: "nalsiufpaweiub",
    });
    expect(response.statusCode).toBe(201);

    const createdUser = await prisma.users.findUnique({
      where: {
        email: "aru@mail.com",
      },
    });
    userId = createdUser.id;
  });

  it("should respond with 409 status code", async () => {
    const response = await request(app).post("/api/v1/auth/register").send({
      email: "aru@mail.com",
      name: "testingjs",
      password: "postini",
      phone_number: "1293712093",
      address: "nalsiufpaweiub",
    });
    expect(response.statusCode).toBe(409);
  });
});

describe("PUT api/v1/users/:id", () => {
  it("should respond with 200 status code", async () => {
    const response = await request(app).put(`/api/v1/users/${userId}`).send({
      email: "aru@mail.com",
      name: "dataupdate",
      password: "passwordupdate",
      phone_number: "1293712093",
      address: "nalsiufpaweiub",
    });
    expect(response.statusCode).toBe(200);
  });
  it("should respond with 400 status code", async () => {
    const response = await request(app).put(`/api/v1/users/aiusgodawu`);
    expect(response.statusCode).toBe(400);
  });
});

describe("GET api/v1/users/:id", () => {
  it("should respond with 200 status code", async () => {
    const response = await request(app).get(`/api/v1/users/${userId}`);
    expect(response.statusCode).toBe(200);
  });
  it("should respond with 400 status code", async () => {
    const response = await request(app).get(`/api/v1/users/asiudpwihaw`);
    expect(response.statusCode).toBe(400);
  });
});

describe("DELETE api/v1/users/:id", () => {
  it("should respond with 204 status code", async () => {
    const response = await request(app).delete(`/api/v1/users/${userId}`);
    expect(response.statusCode).toBe(204);
  });
});
