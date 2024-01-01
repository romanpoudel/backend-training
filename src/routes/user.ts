import { Router } from "express";

import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controller/user";
import { validateReqQuery } from "../middleware/validator";
import { getUserSchema } from "../schema/user";

const router = Router();

router.get("/", validateReqQuery(getUserSchema), getUsers);

router.get("/:id", getUserById);

router.post("/", createUser);

router.put("/", updateUser);

router.delete("/", deleteUser);

export default router;
