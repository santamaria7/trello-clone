import React from "react";

const SingleTask: React.FC<SingleTaskType> = ({task, onClick})=> {
    return <div className="task" onClick={onClick}>
        {task.title}
    </div>
};

export default SingleTask;