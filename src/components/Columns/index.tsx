import React from "react";
import { useColumns } from "../../hooks/useColumns";
import AddColumnForm from "../AddColumnForm";

const Columns = () => {
  const { columns, toggleAddColumnForm, showAddColumnForm, updateColumns } = useColumns();
  return (
    <>
      {columns.length > 0 ? (
        columns.map((column, index) => {
          return <div key={`${column.name}-${index}`}>{column.name}</div>;
        })
      ) : (
        <button type="button" className="add-new" onClick={toggleAddColumnForm}>
          Add A New Column
        </button>
      )}
      {
        showAddColumnForm && <AddColumnForm  onSuccess={updateColumns}/>
      }
    </>
  );
};

export default Columns;
