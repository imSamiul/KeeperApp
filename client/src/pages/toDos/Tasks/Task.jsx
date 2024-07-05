import { Outlet } from "react-router-dom";
import AddToDo from "./AddToDo";
import TaskList from "./TaskList";

function Task() {
  return (
    <div className="bg-[#fca311] h-full bg-opacity-10 p-5">
      <AddToDo />
      <TaskList />
    </div>
  );
}

export default Task;
