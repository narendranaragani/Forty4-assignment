import express from "express";
import {
  createUser,
  getAllUsers,
  updateUserDetails,
  deleteUserDetails,
  getOneUser
} from "../UserController/userController.js";

const router = express.Router();

router.post("/users", createUser); 
router.get("/users", getAllUsers);
router.get("/users/:id", getOneUser);
router.put("/users/:id", updateUserDetails);
router.delete("/users/:id", deleteUserDetails);

export default router;
