import { useEffect, useState } from "react";
import { httpClient } from "../utils/httpClient";

import { useDispatch, useSelector } from "react-redux";
import { columnsReceivedAction } from "../store/actions/columnsReceivedAction";


export const useColumns = () => {
  const dispatch = useDispatch();
  const columns = useSelector<State>((state) => state.columns) as string[];
  const tasks = useSelector<State>((state) => state.tasks) as TasksType;
  const [showAddColumnForm, setShowAddColumnForm] = useState<boolean>(false);
  async function fetchColumns() {
    const res = (await httpClient({ url: "/tasks" })) as Column[];
    const modifiedRes = res.reduce((final, x) => {
      final[x.name] = x.tasks!;
      return final;
    }, {} as TasksType);

    dispatch(columnsReceivedAction(modifiedRes));
  }

  function toggleAddColumnForm() {
    setShowAddColumnForm((prevState) => !prevState);
  }



  useEffect(() => {
    fetchColumns();
  }, []);

  return {
    columns,
    tasks,
    toggleAddColumnForm,
    showAddColumnForm,
    setShowAddColumnForm,
  };
};
