function resetData() {
    if (prompt("Are you sure? Type 'Yes, reset my data' to continue.").toLowerCase() === "yes, reset my data") {
        localStorage.removeItem("score");
        localStorage.removeItem("streak");
        localStorage.removeItem("currentFlag");

        displayScore();
    }
}

function giveUp() {
    if (usedHint === false) {
        usedHint = true;

        formatFeedback.red();
        feedbackDisplay.innerHTML = `Answer: ${currentFlag[0].toUpperCase()}`;

        resetStreak();
    }
}