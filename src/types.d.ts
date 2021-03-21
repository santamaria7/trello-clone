type Task = {
  id: string;
  creator: string;
  date: number; //timestamp
  status: string;
  assignee?: string;
  title: string;
  description?: string;
};

type Column = {
  name: string;
  tasks?: Task[];
};

type ColumnsType = Record<string, Column>;

type ColumnFormType = {
  onSuccess: (payload: Column) => void;
  onCancel: () => void;
};

type SingleColumnType = {
  column: Column;
};

type SingleTaskType = {
  task: Task;
  onClick: ()=> void;
};

type TaskFormType = {
  onSuccess: (payload: Task) => void;
  onCancel: () => void;
  deleteTask: (id: string)=> void;
  columnName: string;
  taskId: string;
  task?: Task;
};

/***************** store *******************/

type Action<T> ={
  type: string;
  payload?: T;
}

type State = {
  columns: ColumnsType;
}