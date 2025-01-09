const request = require("supertest");
const app = require("../server");

describe("Tasks API", () => {
  // GET all tasks
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

  // GET single task
  it("should get single task", async () => {
    const taskId = "677b733604cbfe026d7c9198";
    const res = await request(app).get(`/tasks/${taskId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      _id: taskId,
      title: "math",
      description: "cal 1",
      dueDate: "2025-10-29T00:00:00.000Z",
      priority: "High",
      completed: true,
      __v: 0, // Include the `__v` field in the expected result
    });
  });
});
