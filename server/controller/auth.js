import { Prisma, PrismaClient } from "@prisma/client";
import bcrpyt from "bcrypt";
import { signUserJWT } from "../lib/functions.js";
import { refreshTokenMaxAge } from "../lib/constants.js";

const prisma = new PrismaClient();

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email, and password are required" });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const isMatch = await bcrpyt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Wrong password" });
    }

    const accessToken = signUserJWT(user);

    const refreshToken = signUserJWT(user, true);

    await prisma.user.update({
      data: {
        refreshToken,
      },
      where: {
        email: user.email,
      },
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: "true",
      maxAge: refreshTokenMaxAge,
    });
    res.status(200).json({ accessToken, name: user.name });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required" });
    }

    const user = prisma.user.findUnique({
      where: { email },
      select: { email: true },
    });
    if (!user) {
      return res.status(409).json({ message: "Email already exist" });
    }

    const hashedPass = await bcrpyt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPass,
      },
    });

    res.status(200).json({ message: "User sucessfully registered" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const logout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.refreshToken) return res.sendStatus(204);

  const { refreshToken } = cookies;

  res.clearCookie("refreshToken", {
    httpOnly: true,
    maxAge: refreshTokenMaxAge,
  });

  const user = await prisma.user.findFirst({ where: { refreshToken } });
  if (user) {
    await prisma.user.update({
      data: {
        refreshToken: null,
      },
      where: {
        email: user.email,
      },
    });
  }

  res.sendStatus(204);
};
