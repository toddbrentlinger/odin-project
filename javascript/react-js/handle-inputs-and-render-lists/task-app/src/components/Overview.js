function Overview({ tasks }) {
    const taskComponents = tasks.map((task) => {
        return (
            <li
                key={task.id}
            >
                {task.text}
            </li>
        );
    });

    return (
        <ul id="overview-list">{taskComponents}</ul>
    );
}

export default Overview;
