export type status = 'open' | 'closed';

export interface Item {
  id: string;
  title: string;
  iconName: string;
  info?: string;
  status?: string;
}

export interface MenuOption {
  id: number;
  name: string;
  iconName: string;
  action?: (id: string) => void;
}

export interface TodoInterface {
  _id: object;
  deleted: boolean;
  name: string;
  notes: string;
  status: status;
}

export interface TodoListInterface {
  _id: object;
  deleted?: boolean;
  name: string;
  todos?: TodoInterface[];
}
export interface PreferencesInterface {
  _id: object;
  name: string;
  selectedColor: string;
  colors: string[];
}
