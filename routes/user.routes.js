import { Router } from "express";
import { deleteUsers, getUsers, patchUsers, postUsers, putUsers } from "../controllers/users.controller.js";

const router = Router();

router.get("/", getUsers);

router.put("/:id", putUsers);

router.post("/", postUsers);

router.patch("/", patchUsers);

router.delete("/", deleteUsers);

export { router };
