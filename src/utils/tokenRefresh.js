import { FRONT_URL } from "../config";

export const refreshToken = async () => {
  try {
    const apiRes = await fetch(`${FRONT_URL}/api/account/refresh`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (apiRes.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};
