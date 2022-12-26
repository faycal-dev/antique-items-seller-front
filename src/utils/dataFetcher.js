export const dataFetcher = async (context, url) => {
  const access = context.req.cookies.access;

  let pagination = {
    current: 1,
    previous: null,
    next: "",
    last: 1,
  };
  let data = [];

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
    if (response.status === 200) {
      // in case there is no pagination (fetching a specific product for example)
      if (!res?.results) {
        data = res;
        return data;
      }
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
