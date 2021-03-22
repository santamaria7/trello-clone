import { useDispatch } from "react-redux";
import { FormEvent, useState } from "react";
import { updateColumnTasksAction } from "../store/actions/updateColumnTasksAction";
import { deleteTaskAction } from "../store/actions/deleteTaskAction";

export const useAddEditTask = ({
  closeAction,
  columnName: status,
  taskId,
  task,
}: TaskFormType) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState<string>(task?.title || "");
  const [description, setDescription] = useState<string>(
    task?.description || ""
  );
  const [assignee, setAssignee] = useState<string>(task?.assignee || "");

  function updateTasks(task: Task) {
    dispatch(
      updateColumnTasksAction({
        colName: status,
        task,
      })
    );
    closeAction();
  }
  function deleteTask(taskId: string) {
    //TODO: API call to update the DB
    dispatch(deleteTaskAction({ colName: status, id: taskId }));
    closeAction();
  }

  function addTask(e: FormEvent) {
    e.preventDefault();
    if (title.length > 0) {
      const payload: Task = {
        title,
        description,
        status,
        creator: task?.creator || "MZ B", // In real world cases, we have user that has logged in and the name appears here
        assignee,
        date: task?.date || new Date().getTime(),
        id: task?.id || taskId,
      };
      //TODO: add API call to save the task in the DB
      updateTasks(payload);
    }
  }
  function cancelForm(e: any) {
    if (e.target.id === "task-form-wrapper") {
      closeAction();
    }
  }
  return {
    cancelForm,
    addTask,
    title,
    setTitle,
    description,
    setDescription,
    assignee,
    setAssignee,
    deleteTask,
  };
};
