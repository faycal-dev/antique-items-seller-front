export const refreshToken = async () => {
  try {
    const apiRes = await fetch("http://localhost:3000/api/account/refresh", {
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
