import React, { useState } from "react";
import SingleTask from "../SingleTask";
import AddEditTaskForm from "../AddEditTaskForm";
import { httpClient } from "../../utils/httpClient";
import { useDispatch, useSelector } from "react-redux";
import { ColumnDeletedAction } from "../../store/actions/ColumnDeletedAction";
import { toggleColumnFormAction } from "../../store/actions/toggleColumnFormAction";

const SingleColumn: React.FC<SingleColumnType> = ({
  name,
  tasks,
  columnId,
}) => {
  const [columnName, setColumnName] = useState<string>(name);
  const [showAddTask, setShowAddTask] = useState<boolean>(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
  const [edit, setEdit] = useState<boolean>(false);
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

  function toggleEditColumnMode() {
    setEdit((state) => !state);
  }

  function editColumn(e: any) {
    e.preventDefault();
    httpClient({
      method: "POST",
      url: "/columns/edit",
      data: {
        columnId,
        name: columnName,
      },
    })
      .then((res) => {})
      .catch((err) => {
        //TODO: alert error
        console.log(err);
      })
      .finally(() => toggleEditColumnMode());
  }

  return (
    <div className="column">
      <div className="column__heading">
        {/* //TODO: Use Icons */}
        {edit ? (
          <form onSubmit={editColumn}>
            <input
              value={columnName}
              onChange={(e) => setColumnName(e.target.value)}
            />
            <button type="submit">confirm</button>
            <button type="button" onClick={toggleEditColumnMode}>
              cancel
            </button>
          </form>
        ) : (
          <h3>{columnName}</h3>
        )}
        <div className="column__heading__edit">
          <button type="button" onClick={deleteColumn}>
            +
          </button>
          <button type="button" onClick={toggleEditColumnMode}>
            edit
          </button>
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
