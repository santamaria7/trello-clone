import React, { useState } from "react";
import AddEditTaskForm from "../AddEditTaskForm";
import { ColumnHeading } from "./ColumnHeading";

const SingleColumn: React.FC<SingleColumnType> = ({
  name,
  tasks,
  columnId,
}) => {
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
  const [showAddTask, setShowAddTask] = useState<boolean>(false);

  function toggleAddTaskForm() {
    setShowAddTask((prevState) => !prevState);
  }

  function editTask(task: Task) {
    setEditingTask(task);
    toggleAddTaskForm();
  }

  return (
    <div className="column">
      <ColumnHeading name={name} columnId={columnId} />
      <button
        type="button"
        onClick={toggleAddTaskForm}
        className="button blue margin-top-15"
      >
        Add A New Task
      </button>
      {showAddTask && (
        <AddEditTaskForm
          closeAction={toggleAddTaskForm}
          columnName={name}
          columnId={`${name}-${tasks!.length}`}
          task={editingTask}
          editMode={editingTask !== undefined}
        />
      )}
      {/* {tasks!.map((task, index) => {
        return (
          <SingleTask
            key={`${task.taskId}-${index}`}
            task={task}
            onClick={() => editTask(task)}
          />
        );
      })}*/}
    </div>
  );
};

export default SingleColumn;
