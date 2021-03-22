import { useDispatch, useSelector } from "react-redux";
import { createRef, FormEvent, useEffect, useState } from "react";
import { updateColumnTasksAction } from "../store/actions/updateColumnTasksAction";
import { deleteTaskAction } from "../store/actions/deleteTaskAction";
import { moveTaskAction } from "../store/actions/moveTaskAction";

export const useAddEditTask = ({
  closeAction,
  columnName: status,
  taskId,
  task,
}: TaskFormType) => {
  const dispatch = useDispatch();
  const titleBox =createRef<HTMLInputElement>();
  const columns = useSelector<State>((state) => state.columns) as string[];
  const [title, setTitle] = useState<string>(task?.title || "");
  const [description, setDescription] = useState<string>(
    task?.description || ""
  );
  const [assignee, setAssignee] = useState<string>(task?.assignee || "");
  const [target, setTarget] = useState(status)
  async function updateTasks(task: Task) {
    await dispatch(
      updateColumnTasksAction({
        colName: status,
        task,
      })
    );
    if(task.target){
      dispatch(moveTaskAction({
        parent: status,
        target,
        task
      }))
    }
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
        target,
        date: task?.date || new Date().getTime(),
        id: task?.id || taskId,
      };
      //TODO: add API call to save the task in the DB
      updateTasks(payload);
    }
  }
  function cancelForm(e: any) {
    console.log(e.target.id)
    if (e.target.id === "task-form-wrapper" || e.target.id === "cancel") {
      closeAction();
    }
  }
  useEffect(()=>{
    titleBox.current?.focus()
  },[])
  return {
    columns,
    cancelForm,
    addTask,
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
