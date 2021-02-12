import React from "react";
import { useColumns } from "../../hooks/useColumns";
import AddColumnForm from "../AddColumnForm";
import "./styles.scss";

const Columns = () => {
  const {
    columns,
    toggleAddColumnForm,
    showAddColumnForm,
    updateColumns,
  } = useColumns();
  return (
    <div className="page-wrapper">
      <button type="button" className="add-new" onClick={toggleAddColumnForm}>
        Add A New Column
      </button>
      <div className="columns-wrapper">
        {columns.map((column, index) => {
          return <div className="column" key={`${column.name}-${index}`}>{column.name}</div>;
        })}
      </div>
      {showAddColumnForm && <AddColumnForm onSuccess={updateColumns} />}
    </div>
  );
};

export default Columns;
