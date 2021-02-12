import { useEffect, useState } from "react";
import { httpClient } from "../utils/httpClient";

export const useColumns = () => {
  const [columns, setColumns] = useState<string[]>([]);
  async function fetchColumns(){
   const res =  await httpClient({url: '/tasks'});
   console.log(res)
    //setColumns(res);
  }
  useEffect(() => {
      fetchColumns()


  }, []);

  return {
    columns,
  };
};
