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
    const taskId = "677b71c55174b4eec0c637a0";
    const res = await request(app).get(`/tasks/${taskId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      _id: taskId, // Ensure it matches the correct task ID
      title: "math",
      description: "cal 2",
      dueDate: "2025-12-29T00:00:00.000Z", // Use the correct date format
      priority: "Low",
      completed: true,
      __v: 0, // Include the version key
    });
  });

  it("should get single task", async () => {
    const taskId = "677b734f04cbfe026d7c919b"; // Use the new task ID
    const res = await request(app).get(`/tasks/${taskId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      _id: taskId, // Ensure it matches the correct task ID
      title: "reading",
      description: "book",
      dueDate: "2025-10-24T00:00:00.000Z", // Use the correct date format
      priority: "Low",
      completed: false,
      __v: 0, // Include the version key
    });
  });

  // POST
  it("should create a new task", async () => {
    const newTask = {
      title: "Old Task",
      description: "New Task Description",
      dueDate: "2023-12-31T23:59:59.999Z",
      priority: "Medium",
      completed: true,
    };

    const res = await request(app).post("/tasks").send(newTask);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(
      expect.objectContaining({
        _id: expect.any(String),
        title: "Old Task",
        description: "New Task Description",
        dueDate: "2023-12-31T23:59:59.999Z",
        priority: "Medium",
        completed: true,
      })
    );
  });

  // PATCH
  // it("should update a task", async () => {
  //   const taskId = "677b734f04cbfe026d7c919b";
  //   const updates = {
  //     title: "Updated Task",
  //     description: "Updated Description",
  //     priority: "Low",
  //     completed: true,
  //   };

  //   const res = await request(app).patch(`/tasks/${taskId}`).send(updates);

  //   expect(res.statusCode).toEqual(200);
  //   expect(res.body).toEqual(
  //     expect.objectContaining({
  //       _id: taskId.toString(),
  //       title: "Updated Task",
  //       description: "Updated Description",
  //       dueDate: expect.any(String), // Assuming dueDate is not updated
  //       priority: "Low",
  //       completed: true,
  //     })
  //   );
  // });

  // DELETE
  it("should delete a task", async () => {
    const taskId = "677b71c55174b4eec0c637a0";
    const res = await request(app).delete(`/tasks/${taskId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        message: "Task deleted successfully",
      })
    );

    // Verify the task is deleted
    const deletedTask = await Task.findById(taskId);
    expect(deletedTask).toBeNull();
  });
});
