import { serve } from "@hono/node-server";
import { Hono } from "hono";
import Database from "better-sqlite3";
import { TasksQueries, RecordsQueries } from "./queries.ts";
import { TaskSchema, RecordSchema } from "./schema.ts";
import { HTTPException } from "hono/http-exception";
import { vValidator } from "@hono/valibot-validator";

const app = new Hono();
const db = new Database("src/database.db", { verbose: console.log });

// テーブル作成
db.exec(TasksQueries.createTable);
db.exec(RecordsQueries.createTable);

app.get("/", (c) => c.text("Hello Hono!"));

app.get("/api/tasks", (c) => {
  const tasks = db.prepare(TasksQueries.getAll).all();
  return c.json(tasks);
});

app.post("/api/tasks", vValidator("json", TaskSchema.create), (c) => {
  const { name } = c.req.valid("json");
  try {
    db.prepare(TasksQueries.insert).run(name);
  } catch (error) {
    throw new HTTPException(500, { message: "Failed to create task" });
  }
  return c.json({ message: "Task created successfully" }, 201);
});

app.put(
  "/api/tasks/:id",
  vValidator("json", TaskSchema.updateBody),
  vValidator("param", TaskSchema.updateParam),
  (c) => {
    const { id } = c.req.valid("param");
    const { name } = c.req.valid("json");
    try {
      db.prepare(TasksQueries.update).run(name, id);
    } catch (error) {
      throw new HTTPException(500, { message: "Failed to update task" });
    }
    return c.json({ message: "Task updated successfully" });
  }
);

app.delete("/api/tasks/:id", vValidator("param", TaskSchema.delete), (c) => {
  const { id } = c.req.valid("param");
  try {
    db.prepare(TasksQueries.delete).run(id);
  } catch (error) {
    throw new HTTPException(500, { message: "Failed to delete task" });
  }
  return c.json({ message: "Task deleted successfully" });
});

app.get("/api/records", (c) => {
  const records = db.prepare(RecordsQueries.getAll).all();
  return c.json(records);
});

app.post("/api/records", vValidator("json", RecordSchema.create), (c) => {
  const { task_id, name } = c.req.valid("json");
  try {
    db.prepare(RecordsQueries.insert).run(task_id, name);
  } catch (error) {
    throw new HTTPException(500, { message: "Failed to create record" });
  }
  return c.json({ message: "Record created successfully" }, 201);
});

app.put(
  "/api/records/:id",
  vValidator("json", RecordSchema.updateBody),
  vValidator("param", RecordSchema.updateParam),
  (c) => {
    const { id } = c.req.valid("param");
    const { name } = c.req.valid("json");
    try {
      db.prepare(RecordsQueries.update).run(name, id);
    } catch (error) {
      throw new HTTPException(500, { message: "Failed to update record" });
    }
    return c.json({ message: "Record updated successfully" });
  }
);

app.delete(
  "/api/records/:id",
  vValidator("param", RecordSchema.delete),
  (c) => {
    const { id } = c.req.valid("param");
    try {
      db.prepare(RecordsQueries.delete).run(id);
    } catch (error) {
      throw new HTTPException(500, { message: "Failed to delete record" });
    }
    return c.json({ message: "Record deleted successfully" });
  }
);

app.get(
  "/api/records/task/:task_id",
  vValidator("param", RecordSchema.getByTaskId),
  (c) => {
    const { task_id } = c.req.valid("param");
    const records = db.prepare(RecordsQueries.getByTaskId).all(task_id);
    return c.json(records);
  }
);

app.get(
  "/api/records/task/:task_id/asc",
  vValidator("param", RecordSchema.getByCreatedASC),
  (c) => {
    const { task_id } = c.req.valid("param");
    const records = db.prepare(RecordsQueries.getByCreatedASC).all(task_id);
    return c.json(records);
  }
);

app.get(
  "/api/records/task/:task_id/desc",
  vValidator("param", RecordSchema.getByCreatedDESC),
  (c) => {
    const { task_id } = c.req.valid("param");
    const records = db.prepare(RecordsQueries.getByCreatedDESC).all(task_id);
    return c.json(records);
  }
);

app.get("/api/records/latest", (c) => {
  const records = db.prepare(RecordsQueries.getLatestRecord).all();
  return c.json(records);
});

app.onError((err, c) => {
  console.error(`${err}`);
  return c.json(
    {
      message: "Internal Server Error",
      error: err.message,
    },
    500
  );
});

serve({
  fetch: app.fetch,
  port: 8000,
});
