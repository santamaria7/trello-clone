type Task = {
  taskId: string | null;
  columnId: number;
  creator: string;
  date: number; //timestamp
  status: string;
  assignee?: string;
  title: string;
  description?: string;
};

type Column = {
  name: string;
  columnId: number;
 // tasks?: Task[];
};

type ColumnsType = Record<string, Column>;
type TasksType = Record<string, Task[]>;

type ColumnFormType = {
  onSuccess: () => void;
  onCancel: () => void;
};

type SingleColumnType = {
  name: string;
  columnId: number;
  tasks: Task[]
};

type SingleTaskType = {
  task: Task;
  onClick: ()=> void;
};

type TaskFormType = {
  closeAction: ()=> void;
  columnName: string;
  columnId: number;
  task?: Task;
  editMode?: boolean;
};

/***************** store *******************/

type Action<T> ={
  type: string;
  payload?: T;
}

type View = {
  showColumnForm: boolean;
  showAlert: boolean;
}

type State = {
  columns: string[];
  tasks:TasksType;
  view: View;
}

type DeleteTask = {
  colName: string;
  id: string;
}


type AddColumn = {
  name: string;
}
type RenameColumn = {
  old: string;
  new: string;
}