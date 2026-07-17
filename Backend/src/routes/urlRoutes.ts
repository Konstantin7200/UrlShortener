import app from "../app";
import { Request, Response, Router } from "express";
import { resolveUrl, resolveUrlCreation } from "../controllers/urlController";

const router = Router();

router.get("", resolveUrl);

router.post("", resolveUrlCreation);

export default router;
