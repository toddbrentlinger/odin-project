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

  function handleTaskEdit(e, task) {
    e.preventDefault();

    // Deep copy array of tasks
    const deepCopyTasks = [...tasks];

    // Update task inside deep copy array of tasks

    setTasks(deepCopyTasks);
  }

  function handleTaskDelete(task) {

  }

  return (
    <>
      <TaskCreateForm handleTaskSubmit={handleTaskSubmit} />

      <Overview tasks={tasks} handleTaskEdit={handleTaskEdit} handleTaskDelete={handleTaskDelete} />
    </>
  );
}

export default App;
