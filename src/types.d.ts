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

type ColumnsType = Column[];

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
