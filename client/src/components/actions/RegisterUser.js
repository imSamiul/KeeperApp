import { redirect } from "react-router-dom";
import { addUser, setToken } from "../../pages/users/userSlice";
import { registerUser } from "../../services/apiUsers";
import store from "../../store";
import { getOtpToken, setAuthToken } from "../../util/auth";

export async function action({ request }) {
  const formData = await request.formData();
  const otpToken = getOtpToken();
  const authData = {
    name: formData.get("name"),
    otpToken,
    password: formData.get("password"),
    rePassword: formData.get("rePassword"),
  };
  const errors = {};
  if (authData.name.length < 1) {
    errors.error = "User must have a name";
  } else if (authData.password.length < 6) {
    errors.error = "Password must be at least 6 characters";
  } else if (authData.password.includes("password")) {
    errors.error = "Password cannot contain the word password";
  } else if (authData.password !== authData.rePassword) {
    errors.error = "Passwords do not match";
  }

  if (Object.keys(errors).length > 0) {
    return errors;
  }

  const res = await registerUser(authData);
  if (res.status === 409) {
    errors.message = res.message;
    return errors;
  }
  if (res) {
    store.dispatch(addUser(res.user));
    store.dispatch(setToken(res.token));
    setAuthToken(res.token);
    return redirect("/todo");
  } else {
    return redirect("/register");
  }
}
