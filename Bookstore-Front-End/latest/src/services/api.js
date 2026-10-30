
const BASE_URL = "http://localhost:8000";
const API_URL = `${BASE_URL}/api`;
const TOKEN_KEY = "bookhaven_access_token";

export const setAccessToken = (token) => {
  if (token) {
    sessionStorage.setItem(TOKEN_KEY, token);
  } else {
    sessionStorage.removeItem(TOKEN_KEY);
  }
};

const getAuthHeaders = () => {
  const token = sessionStorage.getItem(TOKEN_KEY);
  return token ? { Authorization: `Bearer ${token}` } : {};
};



// Get Sanctum CSRF Cookie
export const getCsrfCookie = async () => {
  const response = await fetch(
    `${BASE_URL}/sanctum/csrf-cookie`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Accept": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      `CSRF Cookie Error: ${response.status}`
    );
  }

  // 204 No Content - 不需要 response.json()
};

// Read XSRF Token
const getXSRFToken = () => {
  const cookie = document.cookie
    .split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith("XSRF-TOKEN="));

  return cookie
    ? decodeURIComponent(
      cookie.substring("XSRF-TOKEN=".length)
    )
    : null;
};

// GET API
export const apiGet = async (endpoint) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    credentials: "include",
    headers: {
      "Accept": "application/json",
      ...getAuthHeaders(),
    },
  });

  if (!response.ok) {
    const error = new Error(`API Error: ${response.status}`);
    error.status = response.status;
    throw error;
  }

  return response.json();
};


// POST API
export const apiPost = async (endpoint, data = {}) => {
  await getCsrfCookie();

  const xsrfToken = getXSRFToken();

  if (!xsrfToken) {
    throw new Error(
      "XSRF-TOKEN Cookie not found. Check browser cookies."
    );
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "X-XSRF-TOKEN": xsrfToken,
      ...getAuthHeaders(),
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    const error = new Error(result.message || "Login failed");

    error.status = response.status;
    error.errors = result.errors ?? {};
    throw error;
  }

  return result;
};

export const apiPut = async (endpoint, data = {}) => {
  await getCsrfCookie();

  const xsrfToken = getXSRFToken();

  if (!xsrfToken) {
    throw new Error(
      "XSRF-TOKEN Cookie not found. Check browser cookies."
    );
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "X-XSRF-TOKEN": xsrfToken,
      ...getAuthHeaders(),
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    const error = new Error(result.message || "Login failed");

    error.status = response.status;
    error.errors = result.errors ?? {};
    throw error;
  }

  return result;
};

