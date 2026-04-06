import express from "express";
import {readCartDatacontroller} from "../controllers/readcartdata.js";
const router = express.Router();


router.post("/cartread",  readCartDatacontroller);

export default router;