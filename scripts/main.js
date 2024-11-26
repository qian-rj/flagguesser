function randint(max) {
  return Math.floor(Math.random() * (max + 1));
}

const flagDisplay = document.getElementById("flagDisplay");
const gameForm = document.getElementById("user-answer-form");
const feedbackDisplay = document.getElementById("feedback");
const scoreDisplay = document.getElementById("score");
const streakDisplay = document.getElementById("streak");

let usedHint = false;
let currentFlag = null;
let score = localStorage.getItem("score") || 0;
let streak = localStorage.getItem("streak") || 0;

function updateDisplays() {
  scoreDisplay.innerText = score;
  if (streak > 1) {
    scoreDisplay.classList.add("text-success");
    streakDisplay.innerText = streak;
    streakDisplay.style.opacity = 1;
  } else {
    streakDisplay.style.opacity = 0;
  }
}

function updateLocalStorage() {
  localStorage.setItem("score", score);
  localStorage.setItem("streak", streak);
  localStorage.setItem("currentFlag", currentFlag);
}

const formatFeedback = {
  green: () => feedbackDisplay.className = "text-success",
  red: () => feedbackDisplay.className = "text-danger",
  orange: () => feedbackDisplay.className = "text-warning"
};

function resetStreak() {
  scoreDisplay.classList.remove("text-success");
  streak = 0;
  updateLocalStorage();
  updateDisplays();
}

function chooseFlag() {
  const oldFlag = currentFlag;
  while (oldFlag === currentFlag) {
    currentFlag = flags[randint(flags.length - 1)];
  }
  flagDisplay.setAttribute("src", currentFlag[1] || "https://image.freepik.com/free-vector/error-404-page-found-page-found-text-oops-looks-like-something-went-wrong_143407-2.jpg");
}

chooseFlag();
updateDisplays();

gameForm.addEventListener("submit", event => {
  event.preventDefault();

  const userInput = document.getElementById("user-answer");
  const userAnswer = userInput.value.trim().toLowerCase();
  if (userAnswer && !userAnswer.includes(currentFlag[0].toLowerCase())) {
    feedbackDisplay.innerText = "Incorrect";
    formatFeedback.red();
    resetStreak();
  } else {
    userInput.value = "";
    chooseFlag();
    updateLocalStorage();

    if (usedHint) {
      feedbackDisplay.innerText = "Used hint";
      formatFeedback.orange();
    } else {
      score++;
      streak++;
      updateLocalStorage();
      updateDisplays();

      feedbackDisplay.innerText = "Correct";
      formatFeedback.green();

      if ([10, 20, 30, 100].includes(streak)) {
        feedbackDisplay.innerText = `${streak} in a row!`;
      }
    }
    usedHint = false;
  }
});
