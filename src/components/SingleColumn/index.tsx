import React, { useState } from "react";
import SingleTask from "../SingleTask";
import AddEditTaskForm from "../AddEditTaskForm";

const SingleColumn: React.FC<SingleColumnType> = ({ column }) => {
  const [showAddTask, setShowAddTask] = useState<boolean>(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
  // Again, we could use Redux here
  const [tasks, setTasks] = useState<Task[]>(column.tasks || []);
  function toggleAddTaskForm() {
    setShowAddTask((prevState) => !prevState);
  }
  function updateTasks(task: Task) {
    setTasks((prevState) => {
      const existing = prevState.findIndex((item) => item.id === task.id);
      if (existing === -1) {
        return [...prevState, task];
      }
      // if the item exists, replace it => prevents task duplication
      const copy = [...prevState];
      copy.splice(existing, 1, task);
      return copy;
    });
    toggleAddTaskForm();
  }
  function editTask(task: Task) {
    setEditingTask(task);
    toggleAddTaskForm();
  }
  return (
    <div className="column">
      <h3>{column.name}</h3>
      <button type="button" onClick={toggleAddTaskForm}>
        Add A New Task
      </button>
      {tasks.map((task, index) => {
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
          onSuccess={updateTasks}
          onCancel={() => toggleAddTaskForm()}
          columnName={column.name}
          taskId={`${column.name}-${tasks.length}`}
          task={editingTask}
        />
      )}
    </div>
  );
};

export default SingleColumn;
