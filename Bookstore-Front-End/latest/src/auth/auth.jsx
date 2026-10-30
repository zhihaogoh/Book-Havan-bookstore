import { apiGet, apiPost, apiPut, setAccessToken } from "../services/api";

export const handleLogin = async (email, password) => {
  const response = await apiPost("/login", { email, password });
  if (!response.access_token) {
    throw new Error("Login response is missing access_token");
  }
  setAccessToken(response.access_token);
  return response;
};

export const getUser = async () => {
  try {
    const response = await apiGet("/user");
    return response.user ?? response.data ?? response;
  } catch (error) {
    if (error.status === 401) {
      setAccessToken(null);
    }
    throw error;
  }
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
    setAccessToken(null);
    console.log("Logout successful:", response);
  } catch (error) {
    if (error.status === 401) {
      setAccessToken(null);
      return;
    }
    console.error("Logout error:", error);
    throw error;
  }
};

export const getProfile = async () => {
  try {
    const response = await apiGet("/user");
    console.log(response);
    return response.user;
  } catch (error) {
    console.error("Get profile error", error);
  }
};

export const updateProfile = async ({
  first_name,
  last_name,
  email,
  gender,
  phone_number,
  date_of_birth,
}) => {
  try {
    const response = await apiPut("/user/profile", {
      first_name,
      last_name,
      email,
      gender,
      phone_number,
      date_of_birth,
    });
    return response.user;
  } catch (error) {
    console.error("update profile error", error);
    throw error;
  }
};

export const getAddress = async () =>{
   try {
    const response = await apiGet("/address");
    console.log(response);
    return response;
  } catch (error) {
    if (error.status === 401) {
      setAccessToken(null);
    }
    throw error;
  }
}