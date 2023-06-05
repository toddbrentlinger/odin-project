import Overview from "./components/Overview";
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

  return (
    <>
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

      <Overview tasks={tasks} />
    </>
  );
}

export default App;
