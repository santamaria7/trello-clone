import { httpClient } from "../../utils/httpClient";
import React, { useState } from "react";

type ColumnFormType = {
    onSuccess: (payload: Column)=> void
}

const AddColumnForm: React.FC<ColumnFormType> = ({ onSuccess }) => {
  const [name, setName] = useState<string>("");
  async function addNewColumn() {
    const res = await httpClient({
      url: "/add-column",
      method: "POST",
      data: name,
    });
    // Note that here we could use redux action to update the whole application from top.
    // I found this solution faster, yet not as optimized as I wanted it to be.
    onSuccess(res);
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
      </form>
    </div>
  );
};

export default AddColumnForm;
