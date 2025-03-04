import { countRepeatedWords } from "../utils/wordUtils.js";

export const getHomePage = (req, res) => {
  res.render("index", { title: "Ditto | Análise seu Texto" });
};

export const postProcessInputText = (req, res) => {
  const { inputText } = req.body;
  try {
    const result = countRepeatedWords(inputText);
    console.log("Processed input result:", result);
    res.render("result", { title: "Ditto | Resultado da Análise", result });
  } catch (error) {
    console.error("Error processing input text:", error);
    res.status(500).render("index", { title: "Error", message: error.message });
  }
};
