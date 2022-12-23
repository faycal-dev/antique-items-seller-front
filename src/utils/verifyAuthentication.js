import { API_URL } from "../config/index";
import { refreshToken } from "./tokenRefresh";

export const verifyAuthentication = async (context) => {
  const access = context.req.cookies.access ?? false;
  let isAuthenticated = false;

  if (!access) {
    isAuthenticated = await refreshToken();
    return isAuthenticated;
  }

  const body = JSON.stringify({
    token: access,
  });

  try {
    const apiRes = await fetch(`${API_URL}/token/verify/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: body,
    });

    if (apiRes.status === 200) {
      isAuthenticated = true;
      return isAuthenticated;
    } else {
      isAuthenticated = await refreshToken();
      return isAuthenticated;
    }
  } catch (err) {
    return false;
  }
};
