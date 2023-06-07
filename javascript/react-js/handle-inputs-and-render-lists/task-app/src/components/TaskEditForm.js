function TaskEditForm({ task, handleTaskEditSubmit, handleTaskEditCancel, taskInputName = 'task' }) {
    return (
        <form
            onSubmit={handleTaskEditSubmit}
        >
            <input
                type="text"
                name={taskInputName}
                placeholder="Enter task..."
                defaultValue={task.text}
                autoFocus
            ></input>

            <button type="button" onClick={handleTaskEditSubmit}>Update</button>
            <button type="button" onClick={handleTaskEditCancel}>Cancel</button>
        </form>
    );
}

export default TaskEditForm;
