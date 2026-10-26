import { apiGet, apiPost } from "../services/api";

export const handleLogin = async (email, password) => {
  const response = await apiPost("/login", { email, password });
  console.log("Login successful:", response);
  const user = await apiGet("/user");
  console.log("User data:", user);
  
  return response.json();
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
