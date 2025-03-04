import express from "express";
import path from "path";
import wordRoutes from "./src/routes/wordRoutes.js";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));
app.use(express.urlencoded({ extended: true }));

app.use("/", wordRoutes);

app.use((req, res, next) => {
  res.status(404).render("404", { message: "Page Not Found" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
