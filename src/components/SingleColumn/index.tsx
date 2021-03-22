import React, { useState } from "react";
import SingleTask from "../SingleTask";
import AddEditTaskForm from "../AddEditTaskForm";

const SingleColumn: React.FC<SingleColumnType> = ({ name, tasks}) => {
  const [showAddTask, setShowAddTask] = useState<boolean>(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);

  function toggleAddTaskForm() {
    setShowAddTask((prevState) => !prevState);
  }

  function editTask(task: Task) {
    setEditingTask(task);
    toggleAddTaskForm();
  }
  return (
    <div className="column">
      <h3>{name}</h3>
      <button type="button" onClick={toggleAddTaskForm} className="button blue">
        Add A New Task
      </button>
      {tasks!.map((task, index) => {
        return (
          <SingleTask
            key={`${task.id}-${index}`}
            task={task}
            onClick={() => editTask(task)}
          />
        );
      })}
      {showAddTask && (
        <AddEditTaskForm
          closeAction={toggleAddTaskForm}
          columnName={name}
          taskId={`${name}-${tasks!.length}`}
          task={editingTask}
          editMode={editingTask !== undefined}
        />
      )}
    </div>
  );
};

export default SingleColumn;
