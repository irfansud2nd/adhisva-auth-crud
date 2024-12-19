import jwt from "jsonwebtoken";
import "dotenv/config";

export const signUserJWT = (data, refresh = false) => {
  return jwt.sign(
    {
      name: data.name,
      email: data.email,
    },
    refresh
      ? process.env.REFRESH_TOKEN_SECRET
      : process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: refresh ? "3d" : "15m",
    }
  );
};

export const getSkipTakeNum = (skip, take) => {
  return {
    skipNum: parseInt(skip) || 0,
    takeNum: parseInt(take) || 10,
  };
};

export const createTitleSlug = (title) => {
  return title.replace(/\s+/g, "-").toLowerCase();
};
