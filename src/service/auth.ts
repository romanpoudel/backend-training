import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import config from "../config";
import { users } from "../model/users";
import { ISignUp } from "../interface/auth";
import { ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY } from "../constant/jwt";
import UnauthenticatedError from "../error/unauthenticatedError";

const SALT_ROUNDS = 10;

export const signup = async (body: ISignUp) => {
  await bcrypt.hash(body.password, SALT_ROUNDS, function (err, hash) {
    // Store hash in your password DB.
    console.log({ hash });
  });

  return;
};

export const login = async (body: ISignUp) => {
  const user = users.find(({ email }) => email === body.email)!;

  const passwordMatch = await bcrypt.compare(body.password, user.password);

  if (!passwordMatch) {
    throw new UnauthenticatedError("Unauthorized");
  }

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
