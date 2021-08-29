import { useEffect, useState } from "react";
import { httpClient } from "../utils/httpClient";

import { useDispatch, useSelector } from "react-redux";
import { columnsReceivedAction } from "../store/actions/columnsReceivedAction";
import { toggleColumnFormAction } from "../store/actions/toggleColumnFormAction";

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

    /* const res = (await httpClient({ url: "/tasks" })) as Task[];
    const modifiedRes = res.reduce((final, x) => {
      const colName = x.target || x.status;
      final[colName] = res.filter((y) => (y.target || y.status) === colName);
      return final;
    }, {} as TasksType);*/
    //
  }

  function toggleAddColumnForm(value: boolean) {
    console.log('here')
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
