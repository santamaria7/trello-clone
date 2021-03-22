import React from "react";
import { useAddEditTask } from "../../hooks/useAddEditTask";

const AddEditTaskForm: React.FC<TaskFormType> = ({
  closeAction,
  columnName: status,
  taskId,
  task,
}) => {
  const {
    cancelForm,
    addTask,
    title,
    setTitle,
    description,
    setDescription,
    assignee,
    setAssignee,
    deleteTask,
  } = useAddEditTask({
    closeAction,
    columnName: status,
    taskId,
    task,
  });
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
