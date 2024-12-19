import jwt from "jsonwebtoken";
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { signUserJWT } from "../lib/functions.js";

const prisma = new PrismaClient();

export const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.refreshToken) return res.sendStatus(401);

  const { refreshToken } = cookies;

  const user = await prisma.user.findFirst({
    where: {
      refreshToken: refreshToken,
    },
  });
  if (!user) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || user.email !== decoded.email) return res.sendStatus(403);
    const accessToken = signUserJWT(decoded);

    res.json({ accessToken, email: user.email, name: user.name });
  });
};

export default handleRefreshToken;
