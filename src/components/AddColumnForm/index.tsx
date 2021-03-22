import { httpClient } from "../../utils/httpClient";
import React, { FormEvent, useState } from "react";
import { addColumnsAction } from "../../store/actions/updateColumnsAction";
import { useDispatch, useSelector } from "react-redux";



const AddColumnForm: React.FC<ColumnFormType> = ({ onSuccess, onCancel }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState<string>("");
  const [error, setError] = useState("");

  const columns = useSelector<State>(state => state.columns) as string[];

  function updateColumns(name: string) {
    if (columns.indexOf(name) > -1) {
      setError("Column already exists");
    } else {
      setError("");
      dispatch(addColumnsAction({ name }));
     onSuccess();
    }
  }
  async function addNewColumn(e: FormEvent) {
    e.preventDefault();
    //TODO: uncomment when API codes are ready
    /*
     await httpClient({
      url: "/add-column",
      method: "POST",
      data: name,
    })*/

    // Note that here we could use redux action to update the whole application from top.
    // I found this solution faster, yet not as optimized as I wanted it to be.
    updateColumns(name);
  }
  return (
    <div className="form-wrapper">
      <form method="post" onSubmit={addNewColumn}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>Cancel</button>
        <p className="error">{error}</p>
      </form>
    </div>
  );
};

export default AddColumnForm;
