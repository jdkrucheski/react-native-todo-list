import i18n from '../../i18n.config';

export const TODO_SCHEMA = 'Todo';
export const TODOLIST_SCHEMA = 'TodoList';
export const COLOR_SCHEMA = 'Color';
export const PREFERENCES_SCHEMA = 'Preferences';

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

export const PreferencesSchema = {
  name: PREFERENCES_SCHEMA,
  primaryKey: '_id',
  properties: {
    _id: 'objectId',
    name: {type: 'string', default: 'Humano'},
    selectedColor: {type: 'string', default: '#8d9bce'},
    selectedLanguage: {type: 'string', default: i18n.language},
    colors: {
      type: 'list',
      objectType: 'string',
      default: ['#8d9bce', '#F56D91', '#14C38E', '#7858A6', '#8D8DAA'],
    },
    languages: {
      type: 'list',
      objectType: 'string',
      default: ['English', 'Español', 'Português'],
    },
  },
};

export const databaseOptions = {
  path: 'todoListApp.realm',
  schema: [ListSchema, TodoSchema],
};

export const databaseOptionsPreferences = {
  path: 'todoListAppPreferences.realm',
  schema: [PreferencesSchema],
};
