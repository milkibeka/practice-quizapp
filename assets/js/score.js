const submitBtn = document.getElementById("submit");
const initialsEl = document.getElementById("initials");
const highscoresLink = document.getElementById("highscores");

highscoresLink.addEventListener("click", showHighscores);

function showHighscores() {
    const highscores = JSON.parse(localStorage.getItem("highscores")) || [];
  
    // Sort highscores in descending order
    highscores.sort((a, b) => b.score - a.score);
  
    const highscoresList = document.getElementById("highscores");
  
    // Clear highscores list
    highscoresList.innerHTML = "";
  
    // Display each highscore in the list
    highscores.forEach((highscore) => {
      const li = document.createElement("li");
      li.textContent = `${highscore.initials}: ${highscore.score}`;
      highscoresList.appendChild(li);
    });
  }
  function saveScore() {
    const initials = initialsEl.value.toUpperCase();
    if (initials !== "") {
      const highscores = JSON.parse(localStorage.getItem("highscores")) || [];
      highscores.push({ initials, score: score });
      localStorage.setItem("highscores", JSON.stringify(highscores));
      window.location.assign("highscores.html");
    }
  }
  submitBtn.addEventListener("click", saveScore);