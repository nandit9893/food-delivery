import { Router } from "express";
import { addToCart, removeFromCart, getCart } from "../controllers/cart.controllers.js"
import authMiddleware from "../middleware/auth.middleware.js";

const cartRouter = Router();

cartRouter.route("/addtocart").post(authMiddleware, addToCart);
cartRouter.route("/removefromcart").post(authMiddleware, removeFromCart);
cartRouter.route("/getcart").post(authMiddleware, getCart);

export default cartRouter;