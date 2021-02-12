import React from "react";
import SingleTask from "../SingleTask";

const SingleColumn: React.FC<SingleColumnType> = ({ column }) => {
  function addTask() {}
  return (
    <div className="column">
        <h3>{column.name}</h3>
      <button type="button" onClick={addTask}>
        Add A New Task
      </button>
      {column.tasks?.map((task, index) => {
        return <SingleTask key={`${task.id}-${index}`} task={task} />;
      })}
    </div>
  );
};

export default SingleColumn;
