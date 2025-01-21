export const saveUserData = (data) => {
  localStorage.setItem("token", data.token);
  localStorage.setItem("username", data.name);
};
