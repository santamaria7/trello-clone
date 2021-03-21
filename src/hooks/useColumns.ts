import { useEffect, useState } from "react";
import { httpClient } from "../utils/httpClient";

import { useDispatch, useSelector } from "react-redux";
import { columnsReceivedAction } from "../store/actions/columnsReceivedAction";
import { updateColumnsAction } from "../store/actions/updateColumnsAction";
export const useColumns = () => {
  const dispatch = useDispatch();
  const columns = useSelector<State>((state) => state.columns) as ColumnsType;
  const [showAddColumnForm, setShowAddColumnForm] = useState<boolean>(false);
  async function fetchColumns() {
    const res = (await httpClient({ url: "/tasks" })) as Column[];
    const modifiedRes = res.reduce((final, x) => {
      //TODO: check later if we can just pass the x.tasks and not the whole x
      final[x.name] = x;
      return final;
    }, {} as ColumnsType);
    dispatch(columnsReceivedAction(modifiedRes));
  }

  function toggleAddColumnForm() {
    setShowAddColumnForm((prevState) => !prevState);
  }

  function updateColumns(column: Column) {
    dispatch(updateColumnsAction(column));
    toggleAddColumnForm();
  }

  useEffect(() => {
    fetchColumns();
  }, []);

  return {
    columns,
    toggleAddColumnForm,
    showAddColumnForm,
    setShowAddColumnForm,
    updateColumns,
  };
};
