import React from "react";
import { useColumns } from "../../hooks/useColumns";

const Columns = ()=>{
    const {columns} = useColumns();
    return <>
        <p>
            columns
        </p>
    </>
}

export default Columns;