const server = require("../server");
const request = require("supertest");

describe("Testing the server", () => {
  describe("GET /", () => {
    it("Should return status code 200", async () => {
      const data = await request(server).get("/");
      console.log(data.status);
      expect(data.status).toBe(200);
    });
  });
});
