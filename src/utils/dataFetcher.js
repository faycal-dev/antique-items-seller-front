export const dataFetcher = async (context, url) => {
  const access = context.req.cookies.access;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
    });
    const res = await response.json();
    let pagination = {
      current: 1,
      previous: null,
      next: "",
      last: 1,
    };
    let data = [];
    if (response.status === 200) {
      pagination = {
        current: 1,
        previous: res.previous,
        next: res.next,
        last: res.count,
      };
      data = res.results;
      return {
        data,
        pagination,
      };
    } else {
      return {
        data,
        pagination,
      };
    }
  } catch (err) {
    return {
      data,
      pagination,
    };
  }
};
