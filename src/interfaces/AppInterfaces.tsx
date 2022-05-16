export type Status = 'open' | 'closed';

export interface Item {
  id: string;
  title: string;
  iconName: string;
  subTitle?: string;
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
  status: Status;
}

export interface TodoListInterface {
  _id: object;
  deleted?: boolean;
  name: string;
  todos?: TodoInterface[];
}
