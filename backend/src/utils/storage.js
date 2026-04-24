// Storage utility for managing todos in JSON file
const fs = require('fs/promises');
const path = require('path');

const DATA_FILE = path.resolve(__dirname, '../../data/todos.json');

async function ensureDataFile() {
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify([], null, 2), 'utf8');
  }
}

async function readTodos() {
  await ensureDataFile();
  const content = await fs.readFile(DATA_FILE, 'utf8');
  return JSON.parse(content || '[]');
}

async function writeTodos(todos) {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(todos, null, 2), 'utf8');
}

module.exports = {
  readTodos,
  writeTodos,
  ensureDataFile
};