import express from "express";
import { getProducts } from "../controllers/prodictcontroller.js";

export const productRouter = express.Router();
productRouter.get("/products", getProducts);