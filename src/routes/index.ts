import express from "express";
import authRoutes from "./auth.routes";
import categoryRoutes from "./category.routes";

const router = express.Router();


router.use("/auth" ,authRoutes);
router.use("/categories", categoryRoutes);

export default router;