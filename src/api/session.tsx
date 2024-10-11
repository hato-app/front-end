import UserLoginType from "../interfaces/UserLoginType";
import UserType from "../interfaces/UserType";

const endPoint = import.meta.env.VITE_SERVER + "/sessions/";
const endPointUser = import.meta.env.VITE_SERVER + "/users";


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

export const register = async (userLogin: UserLoginType) => {
	const configs: RequestInit = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(userLogin),
	};
	const response = await fetch(endPointUser, configs);
	if (response.status === 200) {
		const user: UserType = await response.json();
		return user;
	} else {
		return null;
	}
};

export const logout = async () => {
  const configs: RequestInit = {
    credentials: "include",
    method: "DELETE",
  };

  await fetch(endPoint, configs);
};
