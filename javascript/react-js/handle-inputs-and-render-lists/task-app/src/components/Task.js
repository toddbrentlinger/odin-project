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
                <button 
                    onClick={handleEditClick}
                    aria-label="Edit" 
                    title="Edit"
                >
                    <span className="fa-solid fa-pen-to-square"></span>
                </button>
                <button 
                    onClick={handleDeleteClick}
                    aria-label="Delete" 
                    title="Delete"
                >
                    <span className="fa-solid fa-trash-can"></span>
                </button>
            </li>
        );
}

export default Task;
