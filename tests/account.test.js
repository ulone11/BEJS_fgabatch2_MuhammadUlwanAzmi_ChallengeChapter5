const app = require("../app");
const request = require("supertest");
const prisma = require("../config/prisma");

let accId;
let userId = "clzmv4f9p0000oc0nvywgibvg"; //diambil secara manual dari db/api test

describe("GET api/v1/accounts", () => {
  it("should respond with 200 status code", async () => {
    const response = await request(app).get("/api/v1/accounts");
    expect(response.statusCode).toBe(200);
  });
});

describe("POST api/v1/accounts", () => {
  it("should respond with 400 status code, balance and userId required", async () => {
    const response = await request(app).post("/api/v1/accounts").send({
      account_name: "tes account",
    });
    expect(response.statusCode).toBe(400);
  });

  it("should respond with 201 status code", async () => {
    const response = await request(app).post("/api/v1/accounts").send({
      account_name: "tes account",
      balance: 36500000,
      userId: userId,
    });
    expect(response.statusCode).toBe(201);

    const createdAcc = await prisma.bank_accounts.findFirst({
      where: {
        account_name: "tes account",
        userId: userId,
      },
    });

    accId = createdAcc.id;
  });
});

describe("GET api/v1/accounts/:id", () => {
  it("should respond with 200 status code", async () => {
    const response = await request(app).get(`/api/v1/accounts/${accId}`);
    expect(response.statusCode).toBe(200);
  });
  it("should respond with 400 status code", async () => {
    const response = await request(app).get(`/api/v1/accounts/asidiwaubdi`);
    expect(response.statusCode).toBe(400);
  });
});

describe("GET api/v1/accounts/user/:userId", () => {
  it("should respond with 200 status code", async () => {
    const response = await request(app).get(`/api/v1/accounts/user/${userId}`);
    expect(response.statusCode).toBe(200);
  });
  it("should respond with 400 status code", async () => {
    const response = await request(app).get(
      `/api/v1/accounts/user/oaiwd0w9012`
    );
    expect(response.statusCode).toBe(400);
  });
});

describe("PUT api/v1/accounts/:id", () => {
  it("should respond with 200 status code", async () => {
    const response = await request(app).put(`/api/v1/accounts/${accId}`).send({
      account_name: "update tes account",
    });
    expect(response.statusCode).toBe(200);
  });
});

describe("DELETE api/v1/accounts/:id", () => {
  it("should respond with 204 status code", async () => {
    const response = await request(app).delete(`/api/v1/accounts/${accId}`);
    expect(response.statusCode).toBe(200);
  });
});
