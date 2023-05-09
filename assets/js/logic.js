
const questions = window.questions;

const startBtn = document.getElementById("start");
const questionContainer = document.getElementById("questions");
const questionEl = document.getElementById("question");
const answerBtnsEl = document.getElementById("answer-buttons");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("time");
const feedbackEl = document.getElementById("feedback");
const initialsEl = document.getElementById("initials");
const submitBtn = document.getElementById("submit");
const highscoresLink = document.getElementById("highscores-link");

let shuffledQuestions, currentQuestionIndex;
let score = 0;
let secondsLeft = 60;
let timerInterval;

startBtn.addEventListener("click", startQuiz);
submitBtn.addEventListener("click", saveScore);
highscoresLink.addEventListener("click", showHighscores);

function startQuiz() {
  score = 0;
  secondsLeft = 60;
  startBtn.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainer.classList.remove("hide");
  setNextQuestion();
  startTimer();
}

function startTimer() {
  let timerInterval = setInterval(function () {
    secondsLeft--;
    timerEl.textContent = "Time left: " + secondsLeft;

    if (secondsLeft <= 0) {
      clearInterval(timerInterval);
      endQuiz();
    }
  }, 1000);
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionEl.innerText = question.question;
  question.choices.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = choice;
    button.classList.add("btn");
    if (answer) {
      button.dataset.correct = answer;
    }
    button.addEventListener("click", selectAnswer);
    answerBtnsEl.appendChild(button);
  });
}

function resetState() {
    clearStatusClass(document.body);
    feedbackEl.innerText = "";
    if (answerBtnsEl !== null) {
      while (answerBtnsEl.firstChild) {
        answerBtnsEl.removeChild(answerBtnsEl.firstChild);
      }
    }
  }
  

function selectAnswer(e) {
  const selectedBtn = e.target;
  const correct = selectedBtn.dataset.correct;
  setStatusClass(document.body, correct);
  if (correct) {
    score += 10;
  } else {
    secondsLeft -= 10;
  }
  feedbackEl.innerText = correct ? "Correct!" : "Wrong!";
  scoreEl.innerText = "Score: " + score;
  Array.from(answerBtnsEl.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
    button.disabled = true;
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    setTimeout(() => {
      currentQuestionIndex++;
      setNextQuestion();
    }, 1000);
  } else {
    setTimeout(() => {
      endQuiz();
    }, 1000);
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

function endQuiz() {
  clearInterval(timerInterval);
  questionContainer.classList.add("hide");
  initialsEl.classList.remove("hide");
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
