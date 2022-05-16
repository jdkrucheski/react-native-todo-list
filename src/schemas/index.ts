export const TODO_SCHEMA = 'Todo';
export const TODOLIST_SCHEMA = 'TodoList';

export const TodoSchema = {
  name: TODO_SCHEMA,
  primaryKey: '_id',
  properties: {
    _id: 'objectId',
    deleted: {type: 'bool', default: false},
    name: {type: 'string', indexed: true},
    notes: {type: 'string', indexed: true},
    status: 'string',
  },
};

export const Listschema = {
  name: TODOLIST_SCHEMA,
  primaryKey: '_id',
  properties: {
    _id: 'objectId',
    deleted: {type: 'bool', default: false},
    name: 'string',
    todos: {type: 'list', objectType: TODO_SCHEMA, default: []},
  },
};

export const databaseOptions = {
  path: 'todoListApp.realm',
  schema: [Listschema, TodoSchema],
};
