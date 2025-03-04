const ignoredWords = new Set([
  "após", "até", "com", "contra", "desde", "entre", "para", "por", 
  "sem", "sob", "sobre", "trás", "como", "este", "esse", "aquele", 
  "aquela", "ela", "ele", "dele", "dela", "esta", "essa", "está", 
  "seu", "sua", "nós", "vós", "eles", "elas", "uns", "umas", "nas", "nos", 
  "àquela", "àqueles", "que", "pela", "pelo", "pelos", "pelas", "cada",
  "quem", "qual", "quais", "quanto", "quantos", "tanto", "também", 
  "mas", "porque", "porém", "contudo", "entretanto", "logo", "então", 
  "embora", "seja", "são", "foi", "foram", "mesmo", 
  "estão", "estar", "estive", "estivemos", "estiveram", "havia", 
  "haver", "ainda", "muito", "mais", "menos", "mais", "bem", 
  "bastante", "pode", "deve", "haver", "dever", "querer", "poder", 
  "ir", "vai", "fui", "ficou", "voltar", "ficar"
]);

export function countRepeatedWords(text) {
  const paragraphs = extractParagraphs(text);
  const wordOccurrences = {};

  paragraphs.forEach((paragraph, index) => {
    const wordInfo = findRepeatedWords(paragraph, index);
    wordInfo.forEach(({ word, count, paragraphs }) => {
      if (!wordOccurrences[word]) {
        wordOccurrences[word] = { count, paragraphs: new Set() };
      } else {
        wordOccurrences[word].count += count;
      }
      paragraphs.forEach((p) => wordOccurrences[word].paragraphs.add(p));
    });
  });

  const result = Object.keys(wordOccurrences)
    .filter(word => wordOccurrences[word].count > 1) 
    .map((word) => ({
      word,
      count: wordOccurrences[word].count,
      paragraphs: [...wordOccurrences[word].paragraphs]
    }));

  return result.length > 0 ? result : null; 
}

function extractParagraphs(text) {
  return text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function cleanWord(word) {
  return word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase();
}

function findRepeatedWords(paragraph, paragraphIndex) {
  const wordsList = paragraph.split(/\s+/);
  const wordCount = {};
  const repeatedWords = [];

  wordsList.forEach((word) => {
    const cleanedWord = cleanWord(word);
    if (cleanedWord.length >= 3 && !ignoredWords.has(cleanedWord)) {
      if (!wordCount[cleanedWord]) {
        wordCount[cleanedWord] = { count: 0, paragraphs: new Set() };
      }
      wordCount[cleanedWord].count += 1;
      wordCount[cleanedWord].paragraphs.add(paragraphIndex + 1);
    }
  });

  for (let word in wordCount) {
    repeatedWords.push({
      word,
      count: wordCount[word].count,
      paragraphs: [...wordCount[word].paragraphs]
    });
  }
  return repeatedWords;
}
