import React from "react";
import { useColumns } from "../../hooks/useColumns";
import AddColumnForm from "../AddColumnForm";
import "../styles.scss";
import SingleColumn from "../SingleColumn";

const Columns = () => {
  const {
    columns,
    toggleAddColumnForm,
    showAddColumnForm,
      setShowAddColumnForm,
    updateColumns,
  } = useColumns();
  return (
    <div className="page-wrapper">
      <button type="button" className="add-new" onClick={toggleAddColumnForm}>
        Add A New Column
      </button>
      <div className="columns-wrapper">
        {columns.map((column, index) => {
          return <SingleColumn key={`${column.name}-${index}`} column={column}/>
        })}
      </div>
      {showAddColumnForm && <AddColumnForm onSuccess={updateColumns} onCancel={() => setShowAddColumnForm(false)}/>}
    </div>
  );
};

export default Columns;
