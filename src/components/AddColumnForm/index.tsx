import { httpClient } from "../../utils/httpClient";
import React, { FormEvent, useState } from "react";



const AddColumnForm: React.FC<ColumnFormType> = ({ onSuccess, onCancel }) => {
  const [name, setName] = useState<string>("");
  async function addNewColumn(e: FormEvent) {
    e.preventDefault();
    //TODO: uncomment when API codes are ready
    /*const res = await httpClient({
      url: "/add-column",
      method: "POST",
      data: name,
    })*/
    const res = {
      name,
      tasks: []
    };
    // Note that here we could use redux action to update the whole application from top.
    // I found this solution faster, yet not as optimized as I wanted it to be.
    onSuccess(name);
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
      </form>
    </div>
  );
};

export default AddColumnForm;
