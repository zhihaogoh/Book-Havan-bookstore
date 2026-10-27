import { apiGet, apiPost } from "../services/api";

export const handleLogin = async (email, password) => {
  const response = await apiPost("/login", { email, password });
  console.log("Login successful:", response);

  const user = await apiGet("/user");

  console.log("User data:", response.access_token, user);

  return response;
};



export const handleRegister = async (
  first_name,
  last_name,
  email,
  password,
  password_confirmation,
) => {
  const response = await apiPost("/register", {
    first_name,
    last_name,
    email,
    password,
    password_confirmation,
  });
  console.log("Register successful", response);
  return response;
};

export const handleLogout = async () => {
  try {
    const response = await apiPost("/logout");
    console.log("Logout successful:", response);
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};
