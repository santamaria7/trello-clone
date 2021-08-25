import React from "react";
import { useAddEditTask } from "../../hooks/useAddEditTask";

const AddEditTaskForm: React.FC<TaskFormType> = ({
  closeAction,
  columnName: status,
  columnId,
  task,
  editMode,
}) => {
  const {
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
  } = useAddEditTask({
    closeAction,
    columnName: status,
    columnId,
    task,
    editMode,
  });

  return (
    <div
      className="task-form-wrapper"
      id="task-form-wrapper"
      onClick={cancelForm}
    >
      <form onSubmit={saveTask}>
        <label>Title:</label>
        <input
          ref={titleBox}
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
        {editMode && (
          <>
            <label>Move to:</label>
            <select value={target} onChange={(e) => setTarget(e.target.value)}>
              {columns.map((col, index) => {
                return (
                  <option value={col} key={`${col}-${index}`}>
                    {col}
                  </option>
                );
              })}
            </select>
          </>
        )}

        <button type="submit" className="button green">
          Save
        </button>
        <button
          type="button"
          onClick={cancelForm}
          id="cancel"
          className="button cancel"
        >
          Cancel
        </button>
        {task && (
          <button
            type="button"
            onClick={() => deleteTask(task?.taskId!)}
            className="button red"
          >
            Delete
          </button>
        )}
      </form>
    </div>
  );
};

export default AddEditTaskForm;
