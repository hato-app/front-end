import UserLoginType from "../interfaces/UserLoginType";
import UserType from "../interfaces/UserType";

const endPoint = import.meta.env.VITE_SERVER + "/sessions/";

export const checkSession = async () => {
  const response = await fetch(endPoint, {
    credentials: "include",
  });
  if (response.status === 200) {
    return await response.json();
  } else {
    return null;
  }
};

export const login = async (userLogin: UserLoginType) => {
  const configs: RequestInit = {
    credentials: "include",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userLogin),
  };
  const response = await fetch(endPoint, configs);
  if (response.status === 200) {
    const user: UserType = await response.json();
    return user;
  } else {
    return null;
  }
};
