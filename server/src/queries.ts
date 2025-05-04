export const TasksQueries = {
  createTable: `CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`,
  insert: `INSERT INTO tasks (name) VALUES (?)`,
  update: `UPDATE tasks SET name = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
  delete: `DELETE FROM tasks WHERE id = ?`,
  getAll: `SELECT * FROM tasks`,
  getById: `SELECT * FROM tasks WHERE id = ?`,
};

export const RecordsQueries = {
  createTable: `CREATE TABLE IF NOT EXISTS records (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    task_id INTEGER NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (task_id) REFERENCES tasks (id)
  )`,
  insert: `INSERT INTO records (task_id, name) VALUES (?, ?)`,
  update: `UPDATE records SET name = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
  delete: `DELETE FROM records WHERE id = ?`,
  getAll: `SELECT * FROM records`,
  getById: `SELECT * FROM records WHERE id = ?`,
  getByTaskId: `SELECT * FROM records WHERE task_id = ?`,
  getByCreatedASC: `SELECT * FROM records WHERE task_id = ? ORDER BY created_at ASC`,
  getByCreatedDESC: `SELECT * FROM records WHERE task_id = ? ORDER BY created_at DESC`,
  getLatestRecord: `SELECT * FROM records WHERE task_id = ? ORDER BY created_at DESC LIMIT 1`,
};
