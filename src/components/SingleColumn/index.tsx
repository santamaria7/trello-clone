import React, { useState } from "react";
import SingleTask from "../SingleTask";
import AddEditTaskForm from "../AddEditTaskForm";
import { httpClient } from "../../utils/httpClient";
import { useDispatch } from "react-redux";
import { ColumnDeletedAction } from "../../store/actions/ColumnDeletedAction";

const SingleColumn: React.FC<SingleColumnType> = ({
  name,
  tasks,
  columnId,
}) => {
  const [showAddTask, setShowAddTask] = useState<boolean>(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
  const dispatch = useDispatch();
  function toggleAddTaskForm() {
    setShowAddTask((prevState) => !prevState);
  }

  function editTask(task: Task) {
    setEditingTask(task);
    toggleAddTaskForm();
  }

  function deleteColumn() {
    //TODO: prompt before deleting
    httpClient({
      method: "POST",
      url: "/columns/delete",
      data: {
        columnId,
      },
    })
      .then((res) => {
        dispatch(ColumnDeletedAction(columnId));
      })
      .catch((err) => {
        console.log(err);
        //TODO:  alert to try again later
      });
  }

  return (
    <div className="column">
      <div className="column__heading">
        <h3>{name}</h3>
        <div className="column__heading__edit">
          {/* //TODO: Use Icons */}
          <button type="button" onClick={deleteColumn}>
            +
          </button>
          {/* <button type="button" onClick={editColumnName}>edit</button>*/}
        </div>
      </div>

      <button type="button" onClick={toggleAddTaskForm} className="button blue">
        Add A New Task
      </button>
      {/* {tasks!.map((task, index) => {
        return (
          <SingleTask
            key={`${task.taskId}-${index}`}
            task={task}
            onClick={() => editTask(task)}
          />
        );
      })}*/}
      {showAddTask && (
        <AddEditTaskForm
          closeAction={toggleAddTaskForm}
          columnName={name}
          columnId={`${name}-${tasks!.length}`}
          task={editingTask}
          editMode={editingTask !== undefined}
        />
      )}
    </div>
  );
};

export default SingleColumn;
