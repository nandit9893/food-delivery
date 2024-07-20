import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import userRouter from "./routes/user.routes.js";
app.use("/api/users", userRouter);

import foodRouter from "./routes/food.routes.js";
app.use("/api/food", foodRouter);
app.use("/images", express.static("./public"));


import cartRouter from "./routes/cart.routes.js"
app.use("/api/carts", cartRouter);

import orderRouter from "./routes/order.routes.js"
app.use("/api/order", orderRouter);

export { app };
