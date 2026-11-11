import {
  apiDelete,
  apiGet,
  apiPost,
  apiPut,
  setAccessToken,
} from "../services/api";

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

export const getAddress = async () => {
  try {
    const response = await apiGet("/address");
    // console.log(response);
    return response;
  } catch (error) {
    if (error.status === 401) {
      setAccessToken(null);
    }
    throw error;
  }
};

export const updateAddress = (id, data) =>
  apiPut(`/address/${encodeURIComponent(id)}`, data);

export const addAddress = async ({
  recipient_name,
  recipent_phone,
  address_1,
  address_2,
  city,
  state,
  postal_code,
  country,
  status,
}) => {
  try {
    const response = await apiPost("/address", {
      recipient_name,
      recipent_phone,
      address_1,
      address_2,
      city,
      state,
      postal_code,
      country,
      status,
    });
    console.log("Address added successfully:", response);
    return response;
  } catch (error) {
    console.error("Error adding address:", error);
    throw error;
  }
};

export const deleteAddress = async (id) => {
  try {
    const response = await apiDelete(`/address/${encodeURIComponent(id)}`);
    return response;
  } catch (error) {
    console.error("Error deleting address:", error);
    throw error;
  }
};

export const changePassword = async (
  current_password,
  new_password,
  new_password_confirmation,
) => {
  try {
    const response = await apiPut("/user/password", {
      current_password,
      new_password,
      new_password_confirmation,
    });
    console.log("Password changed successfully:", response);
    return response;
  } catch (error) {
    console.error("Error changing password:", error);
    throw error;
  }
};

export const getCategory = async () => {
  try {
    const response = await apiGet("/categories");
    // console.log("Categories fetched successfully:", response);
    return response;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const getBook = async (page) => {
  try {
    const response = await apiGet(`/books?page=${page ?? 1}`);
    // console.log(response);
    return response;
  } catch (error) {
    if (error.status === 401) {
      setAccessToken(null);
    }
    throw error;
  }
};

export const getBookById = async (id) => {
  try {
    const response = await apiGet(`/books/${encodeURIComponent(id)}`);
    // console.log("Book fetched successfully:", response);
    return response;
  } catch (error) {
    if (error.status === 401) {
      setAccessToken(null);
    }
    throw error;
  }
};

export const addCart = async (items) => {
  try {
    const response = await apiPost("/cart", {
      items,
    });
    return response;
  } catch (error) {
    if (error.status === 401) {
      console.log(error);
    }
    throw error;
  }
};

export const getCart = async () => {
  try {
    const response = await apiGet("/cart");
    return response;
  } catch (error) {
    if (error.status === 401) {
      console.log("Error fetching carts :", error);
    }
    throw error;
  }
};

export const updateCart = async (id, quantity) => {
  try {
    const response = await apiPost(`/cart/${encodeURIComponent(id)}`, {
      quantity,
    });
    return response;
  } catch (error) {
    if (error.status === 401) {
      console.log("Error fetching carts :", error);
    }
    throw error;
  }
};

export const deleteCart = async (id) => {
  try {
    const response = await apiDelete(`/cart/${encodeURIComponent(id)}`);
    return response;
  } catch (error) {
    if (error.status === 401) {
      setAccessToken(null);
    }
    throw error;
  }
};

export const addWishlist = async (book_id) => {
  try {
    const response = await apiPost("/wishlist", {
      book_id,
    });
    return response;
  } catch (error) {
    if (error.status === 401) {
      console.log(error);
    }
    throw error;
  }
};

export const getWishlist = async () => {
  try {
    const response = await apiGet("/wishlist");
    return response;
  } catch (error) {
    if (error.status === 401) {
      console.log("Error fetching carts :", error);
    }
    throw error;
  }
};

export const deleteWishlist = async (id) => {
  try {
    const response = await apiDelete(`/wishlist/${encodeURIComponent(id)}`);
    console.log(response);
    return response;
  } catch (error) {
    if (error.status === 401) {
      setAccessToken(null);
    }
    throw error;
  }
};

export const storeOrder = async (order, cartIds = []) => {
  const response = await apiPost("/orders", order);
  const failedCartIds = [];
  for (const id of cartIds) {
    try {
      await deleteCart(id);
    } catch {
      failedCartIds.push(id);
    }
  }
  return { ...response, failedCartIds };
};
