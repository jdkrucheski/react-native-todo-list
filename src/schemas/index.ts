export const TODO_SCHEMA = 'Todo';
export const TODOLIST_SCHEMA = 'TodoList';
export const COLOR_SCHEMA = 'Color';
export const THEME_SCHEMA = 'Theme';

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

export const ListSchema = {
  name: TODOLIST_SCHEMA,
  primaryKey: '_id',
  properties: {
    _id: 'objectId',
    deleted: {type: 'bool', default: false},
    name: 'string',
    todos: {type: 'list', objectType: TODO_SCHEMA, default: []},
  },
};

export const ColorSchema = {
  name: COLOR_SCHEMA,
  properties: {
    selected: {type: 'bool', default: false},
    name: 'string',
    accent: 'string',
    primary: 'string',
    secondary: 'string',
    neutral: 'string',
    white: 'string',
  },
};

export const ThemeSchema = {
  name: THEME_SCHEMA,
  properties: {
    isTheFirstOpening: 'bool',
    colors: {type: 'list', objectType: COLOR_SCHEMA},
  },
};

export const databaseOptions = {
  path: 'todoListApp.realm',
  schema: [ListSchema, TodoSchema],
};

export const databaseOptionsTheme = {
  path: 'todoListAppThemes.realm',
  schema: [ThemeSchema, ColorSchema],
};
