import { useEffect, useState } from "react";
import { httpClient } from "../utils/httpClient";

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

export const useColumns = () => {
  const [columns, setColumns] = useState<ColumnsType>([]);
  const [showAddColumnForm, setShowAddColumnForm] = useState<boolean>(false);
  async function fetchColumns() {
    const res = (await httpClient({ url: "/tasks" })) as ColumnsType;
    setColumns(res);
  }

  function toggleAddColumnForm() {
    setShowAddColumnForm((prevState) => !prevState);
  }

  function updateColumns(column: Column) {
    setColumns((prevState) => ({ ...prevState, column }));
  }

  useEffect(() => {
    fetchColumns();
  }, []);

  return {
    columns,
    toggleAddColumnForm,
    showAddColumnForm,
    updateColumns,
  };
};
