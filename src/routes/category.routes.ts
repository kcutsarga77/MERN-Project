import  express  from "express";
import { getAll, getById } from "../controllers/category.controller";

const router = express.Router();

// get all
router.get("/", getAll);

// get by id
router.get("/:id", getById);

// create

// delete

export default router;