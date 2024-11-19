import expreess from "express";
import { loginUser, registerUser } from "../controllers/userController.js";

const userRouter = expreess.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

export default userRouter;
