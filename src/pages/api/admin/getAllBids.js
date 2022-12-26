import cookie from "cookie";
import { API_URL } from "../../../config";

export default async (req, res) => {
  if (req.method === "POST") {
    const body = JSON.stringify(req.body);
    const cookies = cookie.parse(req.headers.cookie ?? "");
    const access = cookies.access ?? false;

    if (access === false) {
      return res.status(401).json({
        error: "User unauthorized to make this request",
      });
    }

    try {
      const apiRes = await fetch(
        `${API_URL}/webadmin/get-product-bids/${req.body.slug}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${access}`,
          },
        }
      );
      const data = await apiRes.json();
      if (apiRes.status === 200) {
        return res.status(200).json({
          success: data.results,
        });
      } else {
        return res.status(apiRes.status).json({
          error: data,
        });
      }
    } catch (err) {
      return res.status(500).json({
        error: "Something went wrong when trying to add item",
      });
    }
  } else {
    res.setHeader("Allow", ["DELETE", "PATCH"]);
    return res.status(405).json({
      error: `Method ${req.method} not allowed`,
    });
  }
};
