import * as v from "valibot";

export const TaskSchema = {
  create: v.object({
    name: v.string(),
  }),
  updateBody: v.object({
    name: v.string(),
  }),
  updateParam: v.object({
    id: v.number(),
  }),
  delete: v.number(),
  getAll: v.object({}),
  getById: v.object({
    id: v.number(),
  }),
}

export const RecordSchema = {
  create: v.object({
    task_id: v.number(),
    name: v.string(),
  }),
  updateBody: v.object({
    name: v.string(),
  }),
  updateParam: v.number(),
  delete: v.number(),
  getAll: v.object({}),
  getById: v.object({
    id: v.number(),
  }),
  getByTaskId: v.object({
    task_id: v.number(),
  }),
  getByCreatedASC: v.object({
    task_id: v.number(),
  }),
  getByCreatedDESC: v.object({
    task_id: v.number(),
  }),
}
