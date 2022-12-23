import cookie from "cookie";
import { API_URL } from "../../../config";

export default async (req, res) => {
  if (req.method === "POST") {
    const { username, password } = req.body;
    const body = JSON.stringify({
      user_name: username,
      password: password,
    });

    try {
      const apiRes = await fetch(`${API_URL}/token/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: body,
      });

      const data = await apiRes.json();

      if (apiRes.status === 200) {
        res.setHeader("Set-Cookie", [
          cookie.serialize("access", data.access, {
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 3,
            sameSite: "strict",
            path: "/",
          }),
          cookie.serialize("refresh", data.refresh, {
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 24,
            sameSite: "strict",
            path: "/",
          }),
        ]);

        return res.status(200).json({
          success: "Logged in successfully",
        });
      } else {
        return res.status(apiRes.status).json({
          error: "Authentication failed",
        });
      }
    } catch (err) {
      return res.status(500).json({
        error: "Something went wrong when authenticating",
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} now allowed` });
  }
};
