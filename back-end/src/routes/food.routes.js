import { Router } from "express";
import { addFood, listFood, removeFood } from "../controllers/food.controllers.js";
import { upload } from "../middleware/addimage.middleware.js";

const foodRouter = Router();
foodRouter.route("/addfood").post(upload.single("image"), addFood);
foodRouter.route("/list").get(listFood);
foodRouter.route("/removefood").post(removeFood);

export default foodRouter;
