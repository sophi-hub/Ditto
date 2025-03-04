import express from "express";
import {
  getHomePage,
  postProcessInputText,
} from "../controllers/wordController.js";

const router = express.Router();

router.get("/", getHomePage);
router.post("/process-input", postProcessInputText);
router.use((req, res) => {
  res.status(404).render("404", { title: "Página Não Encontrada" });
});

export default router;
