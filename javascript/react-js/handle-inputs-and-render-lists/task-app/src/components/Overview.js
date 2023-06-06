import Task from "./Task";

function Overview({ tasks, handleTaskEdit, handleTaskDelete }) {
    const taskComponents = tasks.map((task, index) => {
        return (
            <Task 
                key={task.id}
                number={index + 1} 
                task={task}
                handleTaskEdit={handleTaskEdit}
                handleTaskDelete={handleTaskDelete}
            />
        );
    });

    return (
        <ul id="overview-list">{taskComponents}</ul>
    );
}

export default Overview;
