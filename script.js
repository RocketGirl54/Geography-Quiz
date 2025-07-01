// Your list of countries and their continents
const countries = [ 
  { name: "Canada", continent: "North America" },
  { name: "Brazil", continent: "South America" },
  { name: "Italy", continent: "Europe" },
  { name: "Kenya", continent: "Africa" },
  { name: "Nepal", continent: "Asia" },
  { name: "Fiji", continent: "Oceania" },
  { name: "Kiribati", continent: "Oceania" },
  { name: "Bangladesh", continent: "Asia" },
  { name: "Zimbabwe", continent: "Africa" },
  { name: "Austria", continent: "Europe" },
  { name: "Venezuela", continent: "South America" },
  { name: "Mexico", continent: "North America" },
  { name: "Guatemala", continent: "North America" },
  { name: "Argentina", continent: "South America" },
  { name: "Belgium", continent: "Europe" },
  { name: "Algeria", continent: "Africa" },
  { name: "Samoa", continent: "Oceania" },
  { name: "Cambodia", continent: "Asia" },
  { name: "Iran", continent: "Asia" },
  { name: "Tonga", continent: "Oceania" },
  { name: "Angola", continent: "Africa" },
  { name: "Botswana", continent: "Africa" },
  { name: "Bolivia", continent: "South America" },
  { name: "Denmark", continent: "Europe" },
  { name: "El Salvador", continent: "North America" },
  { name: "Peru", continent: "South America" },
  { name: "Finland", continent: "Europe" },
  { name: "Cameroon", continent: "Africa" },
  { name: "Israel", continent: "Asia" },
  { name: "Uganda", continent: "Africa" },
  { name: "Tanzania", continent: "Africa" },
  { name: "Netherlands", continent: "Europe" },
  { name: "Chad", continent: "Africa" },
  { name: "Vietnam", continent: "Asia" },
  { name: "Panama", continent: "North America" },
  { name: "Ethiopia", continent: "Africa" },
  { name: "Tuvalu", continent: "Oceania" },
  { name: "Jordan", continent: "Asia" },
  { name: "Ghana", continent: "Africa" },
  { name: "Romania", continent: "Europe" },
  { name: "Columbia", continent: "South America" },
  { name: "Madagascar", continent: "Africa" },
  { name: "Philippines", continent: "Asia" },
  { name: "Greece", continent: "Europe" },
  { name: "Malawi", continent: "Africa" },
  { name: "Lebanon", continent: "Asia" },
  { name: "Nicaragua", continent: "North America" },
  { name: "Chile", continent: "South America" },
  { name: "Mauritius", continent: "Africa" },
  { name: "Hungary", continent: "Europe" },
  { name: "Morocco", continent: "Africa" },
  { name: "Vanuatu", continent: "Oceania" },
  { name: "Malaysia", continent: "Asia" },
  { name: "Cuba", continent: "North America" },
  { name: "Mozambique", continent: "Africa" },
  { name: "Sri Lanka", continent: "Asia" },
  { name: "Jamaica", continent: "North America" },
  { name: "Namibia", continent: "Africa" },
  { name: "Thailand", continent: "Asia" },
  { name: "Nigeria", continent: "Africa" },
];
let shuffledCountries = [...countries]; // Copy of the full list to shuffle
currentCountry = null;
let correctCount = 0;
let questionIndex = 0;
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

shuffle(shuffledCountries); // Randomize order once at start

currentCountry = null;

// Reference elements
const countryName = document.getElementById("country-name");
const answerButtons = document.querySelectorAll(".answer-button");
const submitButton = document.getElementById("submit-btn");

// 🔄 Generate a random country
function generateQuestion() {
  clearFeedback();

  if (questionIndex >= shuffledCountries.length) {
    showFinalScore(correctCount); // All questions have been answered
    return;
  }

  currentCountry = shuffledCountries[questionIndex];
  countryName.textContent = currentCountry.name;
}


// ✨ Show result based on user's choice
function checkAnswer(selectedContinent) {
  const feedback = document.createElement("div");
  feedback.id = "feedback";
  feedback.style.position = "absolute";
  feedback.style.top = "70%";
  feedback.style.left = "50%";
  feedback.style.transform = "translateX(-50%)";
  feedback.style.fontSize = "28px";
  feedback.style.color = "white";
  feedback.style.background = "rgba(0,0,0,0.6)";
  feedback.style.padding = "12px 20px";
  feedback.style.borderRadius = "10px";
  feedback.style.textAlign = "center";

  if (selectedContinent === currentCountry.continent) {
    feedback.textContent = "✅ Well Done!";
    correctCount++;
  } else {
    feedback.textContent = `❌ Better Luck Next Time — the correct answer is ${currentCountry.continent}`;
  }
questionIndex++; // ✅ Move to next question
submitButton.style.display = "inline-block"; // Show “Next Question” button

  document.body.appendChild(feedback);

  // Show "Next Question" button
  submitButton.style.display = "inline-block";
}

// Clear old feedback + reset
function clearFeedback() {
  const oldFeedback = document.getElementById("feedback");
  if (oldFeedback) {
    oldFeedback.remove();
  }
  submitButton.style.display = "none";
}

// Listen for answer clicks
answerButtons.forEach(button => {
  button.addEventListener("click", () => {
    checkAnswer(button.textContent);
  });
});

// Listen for "Next" button
submitButton.addEventListener("click", generateQuestion);

// Start the quiz
generateQuestion();

function showFinalScore(correctCount) {
  const total = countries.length;
  const percent = (correctCount / total) * 100;
  let message = "";

  if (percent < 50) {
    message = "Keep Practising";
  } else if (percent < 60) {
    message = "Well Done You Passed, but aim higher";
  } else if (percent < 75) {
    message = "Great Work. You're nearly there!";
  } else if (percent < 91) {
    message = "WOW! You must be pretty happy with yourself";
  } else if (percent < 100) {
    message = "This is fantastic!";
  } else {
    message = "🎉 Congratulations, you have achieved a perfect score!";
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 }
    });
    let victorySound = new Audio('victory-chime.mp3');
    victorySound.play();
  }

  // Display result (you can style this however you like)
  document.body.innerHTML = `
    <div style="
      text-align: center;
      color: white;
      font-size: 28px;
      margin-top: 100px;
      background: rgba(0, 0, 0, 0.6);
      padding: 30px;
      border-radius: 20px;
      width: 60%;
      margin-left: auto;
      margin-right: auto;">
      <p>Your score is <strong>${percent.toFixed(2)}%</strong></p>
      <p>${message}</p>
      <button onclick="location.reload()" style="
        margin-top: 20px;
        padding: 10px 20px;
        font-size: 20px;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;">
        🔁 Play Again
      </button>

    </div>
  `;
}
