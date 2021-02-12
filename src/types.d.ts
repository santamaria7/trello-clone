type Task = {
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
