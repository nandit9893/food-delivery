import { Router } from "express";
import { placeOrder } from "../controllers/order.controllers.js";
import authMiddleware from "../middleware/auth.middleware.js";

const orderRouter = Router();

orderRouter.route("/placeorder").post(authMiddleware, placeOrder);


export default orderRouter;