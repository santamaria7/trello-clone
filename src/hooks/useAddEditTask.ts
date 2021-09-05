import { useDispatch, useSelector } from "react-redux";
import { createRef, FormEvent, useEffect, useState } from "react";
import { updateColumnTasksAction } from "../store/actions/updateColumnTasksAction";
import { deleteTaskAction } from "../store/actions/deleteTaskAction";
import { httpClient } from "../utils/httpClient";
import { addTaskAction } from "../store/actions/addTaskAction";

export const useAddEditTask = ({
  closeAction,
  columnName: status,
  columnId,
  task,
}: TaskFormType) => {
  const dispatch = useDispatch();
  const titleBox = createRef<HTMLInputElement>();
  const columns = useSelector<State>((state) => state.columns) as Column[];
  const [title, setTitle] = useState<string>(task?.title || "");
  const [description, setDescription] = useState<string>(
    task?.description || ""
  );
  const [assignee, setAssignee] = useState<string>(task?.assignee || "");
  const [target, setTarget] = useState(columnId);
  async function updateTasks(task: Task) {
    dispatch((task.taskId ? updateColumnTasksAction : addTaskAction)(task));
    closeAction();
  }
  function deleteTask(taskId: string) {
    //TODO: API call to update the DB
    dispatch(deleteTaskAction({ colName: status, id: taskId }));
    closeAction();
  }

  function saveTask(e: FormEvent) {
    e.preventDefault();
    if (title.length > 0) {
      const payload: Task = {
        title,
        description,
        status,
        creator: task?.creator || "MZ B", // In real world cases, we have user that has logged in and the name appears here
        assignee,
        date: task?.date || new Date().setSeconds(0, 0) / 1000,
        taskId: task?.taskId || null,
        columnId: target,
      };

      httpClient({
        method: "POST",
        url: task ? "/tasks/update" : "/tasks/save",
        data: payload,
      })
        .then((res) => {
          updateTasks(payload);
        })
        .catch((err) => {
          console.log(err);
          //TODO: alert try again
        });
    }
  }
  function cancelForm(e: any) {
    console.log(e.target.id);
    if (e.target.id === "task-form-wrapper" || e.target.id === "cancel") {
      closeAction();
    }
  }
  useEffect(() => {
    titleBox.current?.focus();
  }, []);
  return {
    columns,
    cancelForm,
    saveTask,
    title,
    setTitle,
    description,
    setDescription,
    assignee,
    setAssignee,
    deleteTask,
    target,
    setTarget,
    titleBox,
  };
};
