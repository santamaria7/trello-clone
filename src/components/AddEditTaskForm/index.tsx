import React, { FormEvent, useState } from "react";

const AddEditTaskForm: React.FC<TaskFormType> = ({
  onSuccess,
  onCancel,
  columnName: status,
  taskId,
    task
}) => {
  const [title, setTitle] = useState<string>(task?.title || "");
  const [description, setDescription] = useState<string>(task?.description || "");
  const [assignee, setAssignee] = useState<string>(task?.assignee || "");
  function addTask(e: FormEvent) {
    e.preventDefault();
    if(title.length > 0){
      const payload: Task = {
        title,
        description,
        status,
        creator: task?.creator || "MZ B", // In a real world example we have user that has logged in and the name appears here
        assignee,
        date: task?.date || new Date().getTime(),
        id: task?.id || taskId,
      };
      //TODO: add API call to save the task in the DB
      onSuccess(payload);
    }

  }
  function cancelForm(e: any){
    if(e.target.id === 'task-form-wrapper'){
      onCancel()
    }
  }
  return (
    <div className="task-form-wrapper" id="task-form-wrapper" onClick={cancelForm}>
      <form onSubmit={addTask}>
        <label>
          Title:
        </label>
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
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddEditTaskForm;
