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

export interface Color {
  name: string;
  selected: boolean;
  accent: string;
  primary: string;
  secondary: string;
  neutral: string;
  white: string;
}

// export interface ThemeInterface {
//   isTheFirstOpening: boolean;
//   colors: Color[];
// }

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
