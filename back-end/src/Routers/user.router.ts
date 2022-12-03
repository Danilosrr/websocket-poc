import { Router } from "express";
import { userController } from "../Controllers/user.controller.js";
import validSchema from "../Middlewares/validateSchema.js";
import { userSchema } from "../Schemas/user.schema.js";

const userRouter = Router();

userRouter.post("/signin", validSchema(userSchema), userController.signIn);
userRouter.post("/signup", validSchema(userSchema), userController.signUp);

export default userRouter;
