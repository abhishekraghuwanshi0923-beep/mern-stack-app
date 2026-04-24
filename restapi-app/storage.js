const fs = require('fs/promises');
const path = require('path');

const filePath = path.resolve(__dirname, 'data', 'items.json');

async function loadItems() {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    return JSON.parse(content);
  } catch (err) {
    if (err.code === 'ENOENT') {
      return [];
    }
    throw err;
  }
}

async function saveItems(items) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(items, null, 2), 'utf8');
}

async function getItems() {
  return loadItems();
}

async function getItemById(id) {
  const items = await loadItems();
  return items.find(item => item.id === id);
}

async function createItem(item) {
  const items = await loadItems();
  const nextId = items.length ? Math.max(...items.map(i => i.id)) + 1 : 1;
  const newItem = { id: nextId, ...item };
  items.push(newItem);
  await saveItems(items);
  return newItem;
}

async function updateItem(id, updates) {
  const items = await loadItems();
  const item = items.find(item => item.id === id);
  if (!item) return null;
  Object.assign(item, updates);
  await saveItems(items);
  return item;
}

async function deleteItem(id) {
  const items = await loadItems();
  const index = items.findIndex(item => item.id === id);
  if (index === -1) return false;
  items.splice(index, 1);
  await saveItems(items);
  return true;
}

module.exports = {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem
};