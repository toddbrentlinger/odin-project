function TaskCreateForm({ handleTaskSubmit, taskInputName = 'task' }) {
    return (
        <form
            onSubmit={handleTaskSubmit}
        >
            <input
            type="text"
            name={taskInputName}
            placeholder="Enter task..."
            ></input>

            <button type="submit">Submit</button>
        </form>
    );
}

export default TaskCreateForm;
