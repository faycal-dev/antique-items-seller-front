import cookie from "cookie";
import { API_URL } from "../../../config";

export default async (req, res) => {
  if (req.method === "POST") {
    const cookies = cookie.parse(req.headers.cookie ?? "");
    const access = cookies.access ?? false;
    if (access === false) {
      return res.status(401).json({
        error: "User unauthorized to make this request",
      });
    }
    try {
    //   console.log(req.body);
      const apiRes = await fetch(`${API_URL}/webadmin/create-product/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type":
            "multipart/form-data; boundary=------WebKitFormBoundaryMMS7h5ALES0VEWKR",
          Authorization: `Bearer ${access}`,
        },
        body: req.body,
      });
      const data = await apiRes.json();
      console.log(data);
      if (apiRes.status === 201) {
        return res.status(201).json({
          success: data.success,
        });
      } else if (apiRes.status === 200) {
        return res.status(200).json({
          success: data.success,
        });
      } else {
        return res.status(apiRes.status).json({
          error: data.error,
        });
      }
    } catch (err) {
      return res.status(500).json({
        error: "Something went wrong when trying to add item",
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({
      error: `Method ${req.method} not allowed`,
    });
  }
};
