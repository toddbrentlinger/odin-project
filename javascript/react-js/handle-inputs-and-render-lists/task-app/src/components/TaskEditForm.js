function TaskEditForm({ task, handleTaskEditSubmit, handleTaskEditCancel, taskInputName = 'task' }) {
    return (
        <form
            className="task-edit-form"
            onSubmit={handleTaskEditSubmit}
        >
            <input
                type="text"
                name={taskInputName}
                placeholder="Enter task..."
                defaultValue={task.text}
                autoFocus
            ></input>

            <button className="update-btn" type="button" onClick={handleTaskEditSubmit}>Update</button>
            <button className="cancel-btn" type="button" onClick={handleTaskEditCancel}>Cancel</button>
        </form>
    );
}

export default TaskEditForm;
