import { $authhost, $host } from ".";
import jwtDecode from "jwt-decode";

export const registration = async (email, password) => {
  const { data } = await $host.post("api/users/registration", {
    email,
    password,
  });
  localStorage.setItem("token", data.token);
  return jwtDecode(data.token);
};

export const login = async (email, password) => {
  const { data } = await $host.post("api/users/login", { email, password });
  localStorage.setItem("token", data.token);
  return jwtDecode(data.token);
};

export const check = async () => {
  const { data } = await $authhost.get("api/users/auth");
  localStorage.setItem("token", data.token);
  return jwtDecode(data.token);
};
