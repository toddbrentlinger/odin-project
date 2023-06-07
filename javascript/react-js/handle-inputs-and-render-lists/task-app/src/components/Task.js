import { useState } from "react";
import TaskEditForm from "./TaskEditForm";

function Task({ task, number, handleTaskEdit, handleTaskDelete }) {
    const [isEditMode, setIsEditMode] = useState(false);

    function handleEditClick() {
        setIsEditMode(true);
    }

    function handleEditSubmit(e) {
        e.preventDefault();
        setIsEditMode(false);
        handleTaskEdit(e, task.id);
    }

    function handleEditCancel() {
        setIsEditMode(false);
    }

    function handleDeleteClick() {
        handleTaskDelete(task.id);
    }

    return isEditMode ? 
        (
            <TaskEditForm
                task={task} 
                handleTaskEditSubmit={handleEditSubmit} 
                handleTaskEditCancel={handleEditCancel}
            />
        ) : (
            <li className="task">
                <span className="task-number">{number}</span>
                <span className="task-text">{task.text}</span>
                <button onClick={handleEditClick}>
                    <span className="fa-solid fa-pen-to-square" aria-label="Edit"></span>
                </button>
                <button onClick={handleDeleteClick}>
                    <span className="fa-solid fa-trash-can" aria-label="Delete"></span>
                </button>
            </li>
        );
}

export default Task;
