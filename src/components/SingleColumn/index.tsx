import React, { useState } from "react";
import SingleTask from "../SingleTask";
import AddTaskForm from "../AddTaskForm";

const SingleColumn: React.FC<SingleColumnType> = ({ column }) => {
  const [showAddTask, setShowAddTask] = useState<boolean>(false);
  // Again, we could use Redux here
  const [tasks, setTasks] = useState<Task[]>(column.tasks || []);
  function toggleAddTaskForm() {
    setShowAddTask((prevState) => !prevState);
  }
  function updateTasks(task: Task) {
    setTasks((prevState) => [...prevState, task]);
    toggleAddTaskForm();
  }
  return (
    <div className="column">
      <h3>{column.name}</h3>
      <button type="button" onClick={toggleAddTaskForm}>
        Add A New Task
      </button>
      {tasks.map((task, index) => {
        return <SingleTask key={`${task.id}-${index}`} task={task} />;
      })}
      {showAddTask && (
        <AddTaskForm
          onSuccess={updateTasks}
          onCancel={() => toggleAddTaskForm()}
          columnName={column.name}
          taskId={`${column.name}-${tasks.length}`}
        />
      )}
    </div>
  );
};

export default SingleColumn;
