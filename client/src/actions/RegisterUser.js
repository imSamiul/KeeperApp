import { redirect } from "react-router-dom";
import { registerUser } from "../services/apiUsers";
import store from "../store";
import { addUser, setToken } from "../components/users/userSlice";

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const res = await registerUser(data);
  if (res) {
    store.dispatch(addUser(res.user));
    store.dispatch(setToken(res.token));
    localStorage.setItem("token", res.token);

    return redirect("/todo");
  } else {
    return redirect("/register");
  }
}
