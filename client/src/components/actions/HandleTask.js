import { addTodo } from "../../pages/toDos/Tasks/todoSlice";
import { createTask, handleCompleteTask } from "../../services/apiTasks";
import store from "../../store";

export async function action({ request, params }) {
  const data = await request.formData();
  if (request.method === "PATCH") {
    const id = data.get("id");

    const task = await handleCompleteTask(id);
    console.log(task);

    return null;
  }

  const { listName } = params;
  const modifyListName = listName.replace(/-/g, " ");

  const btnIntent = data.get("intent");
  const title = data.get("title");

  let message = {};
  if (title.length < 1) {
    message.error = "Task must be at least 1 character";
  }
  if (Object.keys(message).length > 0) {
    return message;
  }

  const toDoData = {
    title,
    listName: modifyListName,
    completed: false,
  };
  if (btnIntent === "addTask") {
    const newTask = await createTask(toDoData);
    console.log(newTask);
    store.dispatch(addTodo(newTask.savedTask));
    message.success = "Task added successfully!";
    return message;
  }
}
