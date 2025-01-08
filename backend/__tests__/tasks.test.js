const request = require("supertest");
const app = require("../server");

describe("Tasks API", () => {
  it("should get all tasks", async () => {
    const res = await request(app).get("/tasks");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          _id: expect.any(String),
          title: expect.any(String),
          description: expect.any(String),
          dueDate: expect.any(String),
          priority: expect.any(String),
          completed: expect.any(Boolean),
        }),
      ])
    );
  });

  // Add more tests
});
