export const logoutHandler = async (router) => {

  try {
    const res = await fetch("/api/account/logout", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    });
    if (res.status === 200) {
      router.push("/auth/login");
    }
  } catch (err) {
    console.log(err);
  }
};
