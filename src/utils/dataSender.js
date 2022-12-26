export const dataSender = async (data, url, method = "POST") => {
  const body = JSON.stringify(data);
  try {
    const apiRes = await fetch(url, {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body,
    });
    const res = await apiRes.json();
    if (apiRes.status === 200 || apiRes.status === 201) {
      return { message: res.success, success: true };
    } else {
      return { message: res.error, success: false };
    }
  } catch (err) {
    return { message: err.message, success: false };
  }
};
