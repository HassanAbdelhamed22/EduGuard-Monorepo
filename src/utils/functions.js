export const saveUserData = (data) => {
  localStorage.setItem("token", data.token);
  localStorage.setItem("username", data.name);
  localStorage.setItem("role", data.role);

  if (!isNaN(data.expires_in)) {
    const expiryTime = Date.now() + data.expires_in * 1000;
    localStorage.setItem("tokenExpiry", expiryTime);
  } else {
    console.error("Invalid expires_in value:", data.expires_in);
  }
};

export const removeUserData = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("role");
  localStorage.removeItem("profilePicture");
  localStorage.removeItem("tokenExpiry");
};
