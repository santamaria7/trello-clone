import React, { useState } from "react";
import SingleTask from "../SingleTask";
import AddEditTaskForm from "../AddEditTaskForm";
import { useDispatch } from "react-redux";
import { updateColumnTasksAction } from "../../store/actions/updateColumnTasksAction";
import { deleteTaskAction } from "../../store/actions/deleteTaskAction";

const SingleColumn: React.FC<SingleColumnType> = ({ name, tasks}) => {
  const dispatch = useDispatch();
  const [showAddTask, setShowAddTask] = useState<boolean>(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
  function toggleAddTaskForm() {
    setShowAddTask((prevState) => !prevState);
  }
  function updateTasks(task: Task) {
   dispatch(updateColumnTasksAction({
     colName: name,
     task
   }))
    toggleAddTaskForm();
  }
  function deleteTask(taskId: string){
    //TODO: API call to update the DB
    dispatch(deleteTaskAction(taskId))
      toggleAddTaskForm();
    }


  function editTask(task: Task) {
    setEditingTask(task);
    toggleAddTaskForm();
  }
  return (
    <div className="column">
      <h3>{name}</h3>
      <button type="button" onClick={toggleAddTaskForm}>
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
          onSuccess={updateTasks}
          onCancel={() => toggleAddTaskForm()}
          deleteTask={deleteTask}
          columnName={name}
          taskId={`${name}-${tasks!.length}`}
          task={editingTask}
        />
      )}
    </div>
  );
};

export default SingleColumn;
