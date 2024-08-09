const app = require("../app");
const request = require("supertest");
const prisma = require("../config/prisma");

let transactionId;
const accId1 = "clzmvckd3000boc0nb0iw0u53"; //diambil secara manual dari db/api test
const accId2 = "clzmve052000doc0nvm18omp9"; //diambil secara manual dari db/api test

describe("POST api/v1/transactions", () => {
  it("should respond with 200 status code", async () => {
    const response = await request(app).post("/api/v1/transactions").send({
      amount: 25000,
      source_account_id: accId1,
      destination_account_id: accId2,
    });
    expect(response.statusCode).toBe(201);

    transactionId = response.body.id;
  });
  it("should respond with 400 status code, source account not found", async () => {
    const response = await request(app).post("/api/v1/transactions").send({
      amount: 25000,
      source_account_id: "asdawdad",
      destination_account_id: accId2,
    });
    expect(response.statusCode).toBe(400);
  });
  it("should respond with 400 status code, destination account not found", async () => {
    const response = await request(app).post("/api/v1/transactions").send({
      amount: 25000,
      source_account_id: accId1,
      destination_account_id: "accId2",
    });
    expect(response.statusCode).toBe(400);
  });
});

describe("GET api/v1/transactions", () => {
  it("should respond with 200 status code", async () => {
    const response = await request(app).get("/api/v1/transactions");
    expect(response.statusCode).toBe(200);
  });
});

describe("GET api/v1/transactions/:id", () => {
  it("should respond with 200 status code", async () => {
    const response = await request(app).get(
      `/api/v1/transactions/${transactionId}`
    );
    expect(response.statusCode).toBe(200);
  });
});

describe("GET api/v1/transactions/account/:accId", () => {
  it("should respond with 200 status code", async () => {
    const response = await request(app).get(
      `/api/v1/transactions/account/${accId1}`
    );
    expect(response.statusCode).toBe(200);
  });
});
