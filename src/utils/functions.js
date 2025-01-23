export const saveUserData = (data) => {
  localStorage.setItem("token", data.token);
  localStorage.setItem("username", data.name);
  localStorage.setItem("role", data.role);
  localStorage.setItem("profile_picture", data.profile_picture);
};

export const removeUserData = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("role");
  localStorage.removeItem("profile_picture");
};


