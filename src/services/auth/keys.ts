const API_ROUTE = "auth"

export const authKeys = {
  all: ["auth"] as const,
  login: () => [...authKeys.all, "login"] as const,
  register: () => [...authKeys.all, "register"] as const,
  currentUser: () => [...authKeys.all, "currentUser"] as const,
};

export const storageKeys = {
  accessToken: "token",
  refreshToken: "refresh_token",
  user: "user",
};

export const apiEndpoints = {
  auth: {
    login: `${API_ROUTE}/login`,
    register: `${API_ROUTE}/register`,
    currentUser: `me`,
  },
};
