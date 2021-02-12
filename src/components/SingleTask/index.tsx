import React from "react";

const SingleTask: React.FC<SingleTaskType> = ({task})=> {
    return <div className="task">
        {task.title}
    </div>
};

export default SingleTask;