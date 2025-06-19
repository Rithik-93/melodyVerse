import Router, { Router as IRouter } from "express";
import {
  login,
  logout,
  refreshAccessToken,
  register,
} from "../controllers/auth.controller";

const router: IRouter = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.post("/refresh-token", refreshAccessToken);

export default router;