import AddEditTaskForm from "../AddEditTaskForm";
import React, { useState } from "react";
import { httpClient } from "../../utils/httpClient";
import { ColumnDeletedAction } from "../../store/actions/ColumnDeletedAction";
import { columnRenamedAction } from "../../store/actions/columnRenamedAction";
import { useDispatch } from "react-redux";

type ColumnHeadingProps = {
  name: string;
  columnId: number;
};

export const ColumnHeading: React.FC<ColumnHeadingProps> = ({
  name,
  columnId,
}) => {
  const [columnName, setColumnName] = useState<string>(name);

  const [edit, setEdit] = useState<boolean>(false);
  const dispatch = useDispatch();
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
      .then((res) => {
        dispatch(
          columnRenamedAction({
            old: name,
            new: columnName,
          })
        );
      })
      .catch((err) => {
        //TODO: alert error
        console.log(err);
      })
      .finally(() => toggleEditColumnMode());
  }

  function cancelEditColumn() {
    setColumnName(name);
    toggleEditColumnMode();
  }
  return (
    <div className="column__heading">
      {edit ? (
        <form onSubmit={editColumn}>
          <input
            value={columnName}
            onChange={(e) => setColumnName(e.target.value)}
          />
          <button
            type="submit"
            className="fas fa-check action-button green"
            aria-label="confirm"
          />
          <button
            type="button"
            onClick={cancelEditColumn}
            className="fas fa-times action-button red"
            aria-label="cancel"
          />
        </form>
      ) : (
        <>
          <h3>{columnName}</h3>
          <div className="column__heading__edit">
            <button
              type="button"
              onClick={deleteColumn}
              className="far fa-trash-alt action-button"
              aria-label="delete"
            />
            <button
              type="button"
              onClick={toggleEditColumnMode}
              className="far fa-edit action-button"
              aria-label="edit"
            />
          </div>
        </>
      )}
    </div>
  );
};
