import React from "react";
import { useColumns } from "../../hooks/useColumns";
import AddColumnForm from "../AddColumnForm";
import "../styles.scss";
import SingleColumn from "../SingleColumn";

const Columns = () => {
  const {
    columns,
    tasks,
    toggleAddColumnForm,
    showAddColumnForm,
    setShowAddColumnForm,
  } = useColumns();
  return (
    <div className="page-wrapper">
      <button type="button" className="add-new" onClick={toggleAddColumnForm}>
        Add A New Column
      </button>
      <div className="columns-wrapper">
        {columns.map((name, index) => {
          return (
            <SingleColumn
              key={`${name}-${index}`}
              tasks={tasks[name]}
              name={name}
            />
          );
        })}
      </div>
      {showAddColumnForm && (
        <AddColumnForm
          onSuccess={toggleAddColumnForm}
          onCancel={() => setShowAddColumnForm(false)}
        />
      )}
    </div>
  );
};

export default Columns;
