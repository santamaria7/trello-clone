type Task = {
  id: string;
  creator: string;
  date: number; //timestamp
  status: string;
  assignee?: string;
  title: string;
  description?: string;
  target?: string;
};

type Column = {
  name: string;
  tasks?: Task[];
};

type ColumnsType = Record<string, Column>;
type TasksType = Record<string, Task[]>;

type ColumnFormType = {
  onSuccess: () => void;
  onCancel: () => void;
};

type SingleColumnType = {
  name: string;
  tasks: Task[]
};

type SingleTaskType = {
  task: Task;
  onClick: ()=> void;
};

type TaskFormType = {
  closeAction: ()=> void;
  columnName: string;
  taskId: string;
  task?: Task;
  editMode?: boolean;
};

/***************** store *******************/

type Action<T> ={
  type: string;
  payload?: T;
}

type State = {
  columns: string[];
  tasks:TasksType
}

type UpdateTask = {
  colName: string;
  task: Task
}

type DeleteTask = {
  colName: string;
  id: string;
}
type MoveTask = {
  parent: string;
  target: string;
  task: Task;
}

type AddColumn = {
  name: string;
}