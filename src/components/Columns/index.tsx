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
  } = useColumns();
  return (
    <div className="page-wrapper">
      <button type="button" className="add-new button blue" onClick={() => toggleAddColumnForm(true)} >
        Add A New Column
      </button>
      <div className="columns-wrapper">
        {columns.map((column, index) => {
          return (
            <SingleColumn
              key={`${column.name}-${index}`}
              tasks={tasks[column.name]}
              name={column.name}
              columnId={column.columnId}
            />
          );
        })}
      </div>
      {showAddColumnForm && (
        <AddColumnForm
          onSuccess={() => toggleAddColumnForm(false)}
          onCancel={() => toggleAddColumnForm(false)}
        />
      )}
    </div>
  );
};

export default Columns;
