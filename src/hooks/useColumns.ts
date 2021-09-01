import { useEffect, useState } from "react";
import { httpClient } from "../utils/httpClient";

import { useDispatch, useSelector } from "react-redux";
import { columnsReceivedAction } from "../store/actions/columnsReceivedAction";
import { toggleColumnFormAction } from "../store/actions/toggleColumnFormAction";
import { tasksReceivedAction } from "../store/actions/tasksReceivedAction";

export const useColumns = () => {
  const dispatch = useDispatch();
  const columns = useSelector<State>((state) => state.columns) as Column[];
  const tasks = useSelector<State>((state) => state.tasks) as TasksType;

  const showAddColumnForm = useSelector<State>(
    (state) => state.view.showColumnForm
  ) as boolean;

  async function fetchColumns() {
    const res = (await httpClient({ url: "/columns" })) as Column[];
    dispatch(columnsReceivedAction(res));
    const tasks = (await httpClient({ url: "/tasks" })) as Task[];
    dispatch(tasksReceivedAction(tasks))

  }

  function toggleAddColumnForm(value: boolean) {
    dispatch(
      toggleColumnFormAction(value)
    );
  }

  useEffect(() => {
    fetchColumns();
  }, []);

  return {
    columns,
    tasks,
    toggleAddColumnForm,
    showAddColumnForm,
  };
};
