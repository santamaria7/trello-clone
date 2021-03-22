import React, { FormEvent, useState } from "react";
import { updateColumnTasksAction } from "../../store/actions/updateColumnTasksAction";
import { deleteTaskAction } from "../../store/actions/deleteTaskAction";
import { useDispatch } from "react-redux";

const AddEditTaskForm: React.FC<TaskFormType> = ({
  closeAction,
  columnName: status,
  taskId,
  task,
}) => {
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
  return (
    <div
      className="task-form-wrapper"
      id="task-form-wrapper"
      onClick={cancelForm}
    >
      <form onSubmit={addTask}>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Description: </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>Assignee</label>
        {/*
        In a real world example this should be multi-select list to show members as 
        options so that we can select multiple users and assign the task to them
        */}
        <input
          type="text"
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
        />
        <button type="submit">Save</button>
        <button type="button" onClick={cancelForm}>
          Cancel
        </button>
        {task && (
          <button type="button" onClick={() => deleteTask(task?.id)}>
            Delete
          </button>
        )}
      </form>
    </div>
  );
};

export default AddEditTaskForm;
