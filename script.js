let currentWord = "";

async function getNewWord() {
  const output = document.getElementById("definition");
  const feedback = document.getElementById("feedback");
  const input = document.getElementById("userInput");
  input.value = "";
  feedback.innerText = "";

  // Get a random word
  const wordRes = await fetch("https://random-word-api.herokuapp.com/word");
  const wordData = await wordRes.json();
  const word = wordData[0];
  currentWord = word;

  // Get definition
  const defRes = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
  const defData = await defRes.json();

  if (defData.title === "No Definitions Found") {
    // Retry if no definition found
    getNewWord();
    return;
  }

  const definition = defData[0]?.meanings[0]?.definitions[0]?.definition || "Definition not found.";
  output.innerText = definition;
}

function checkAnswer() {
  const userAnswer = document.getElementById("userInput").value.trim().toLowerCase();
  const feedback = document.getElementById("feedback");

  if (userAnswer === currentWord.toLowerCase()) {
    feedback.innerText = "Correct!";
    feedback.style.color = "#00ff9d";
  } else {
    feedback.innerText = `oops! The correct word was: "${currentWord}"`;
    feedback.style.color = "#ff6b6b";
  }
}

window.onload = getNewWord;