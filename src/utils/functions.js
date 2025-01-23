export const saveUserData = (data) => {
  localStorage.setItem("token", data.token);
  localStorage.setItem("username", data.name);
  localStorage.setItem("role", data.role);
  localStorage.setItem('tokenExpiry', Date.now() + (data.tokenExpiry * 1000));
};

export const removeUserData = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("role");
  localStorage.removeItem("profilePicture");
};


