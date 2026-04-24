const { v4: uuidv4 } = require('uuid');

class Todo {
  constructor(title, description = '') {
    this.id = uuidv4();
    this.title = title;
    this.description = description;
    this.completed = false;
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  static fromJSON(json) {
    const todo = Object.create(Todo.prototype);
    Object.assign(todo, json);
    return todo;
  }

  update(updates) {
    Object.assign(this, updates);
    this.updatedAt = new Date().toISOString();
    return this;
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      completed: this.completed,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

module.exports = Todo;