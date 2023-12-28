import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { ISignUp } from "../interface/auth";
import config from "../config";
import { ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY } from "../constant/jwt";

const SALT_ROUNDS = 10;

export const signup = async (body: ISignUp) => {
  await bcrypt.hash(body.password, SALT_ROUNDS, function (err, hash) {
    // Store hash in your password DB.
    console.log({ hash });
  });

  return;
};

export const login = async (body: ISignUp) => {
  const passwordMatch = await bcrypt.compare(
    body.password,
    "$2b$10$5vLyEtfGWAvUZDmRjgaJkuQOHk1ON4H.plU7RjvhRTbBp8xOBi9km"
  );

  if (!passwordMatch) {
    throw new Error("Unauthorized");
  }

  const user = { id: 1, name: "User 1" };

  const accessToken = jwt.sign(user, config.jwt.accessTokenSecret!, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });

  const refreshToken = jwt.sign(user, config.jwt.refreshTokenSecret!, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
  });

  console.log({ accessToken, refreshToken });

  return {
    accessToken,
    refreshToken,
  };
};
