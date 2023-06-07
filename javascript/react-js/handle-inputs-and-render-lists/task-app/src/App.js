import Overview from "./components/Overview";
import TaskCreateForm from "./components/TaskCreateForm";
import { useState } from "react";
import uniqid from "uniqid";

function App() {
  const [tasks, setTasks] = useState([]);
  const taskInputName = 'task';

  function handleTaskSubmit(e) {
    // Prevent form submit default behavior that loads page with updated url
    e.preventDefault();

    // Add new task
    setTasks([
      ...tasks,
      {
        text: e.target.elements[taskInputName].value,
        id: uniqid(),
      }
    ]);

    // Reset form
    e.target.reset();
  }

  function handleTaskEdit(e, taskId) {
    e.preventDefault();
    
    // Deep copy array of tasks
    const deepCopyTasks = [...tasks];

    // Update task inside deep copy array of tasks
    const oldTask = deepCopyTasks.find((task) => task.id === taskId);
    if (oldTask) {
      oldTask.text = e.target.elements[taskInputName].value
    }

    setTasks(deepCopyTasks);
  }

  function handleTaskDelete(taskId) {
    setTasks(tasks.filter((task) => task.id !== taskId));
  }

  return (
    <>
      <TaskCreateForm handleTaskSubmit={handleTaskSubmit} />

      <Overview tasks={tasks} handleTaskEdit={handleTaskEdit} handleTaskDelete={handleTaskDelete} />
    </>
  );
}

export default App;
