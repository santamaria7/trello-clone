import { useEffect, useState } from "react";
import { httpClient } from "../utils/httpClient";



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
    setColumns((prevState) => ([...prevState, column ]));
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
