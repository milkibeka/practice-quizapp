

const myQuestions = quizQuestions.map(question => ({
  question: question.question,
  choices: question.choices,
  answer: question.answer
}));

const startBtn = document.getElementById("start");
const questionContainer = document.getElementById("questions");
const questionEl = document.getElementById("question-title");
const answerBtnsEl = document.getElementById("answer-buttons");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("time");
const feedbackEl = document.getElementById("feedback");
const endScreen = document.getElementById("end-screen");

let shuffledQuestions, currentQuestionIndex;
let score = 0;
let secondsLeft = 60;
let timerInterval;

startBtn.addEventListener("click", startQuiz);


function startQuiz() {
  score = 0;
  secondsLeft = 60;
  startBtn.classList.add("hide");
  shuffledQuestions = myQuestions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainer.classList.remove("hide");
  setNextQuestion();
  startTimer();
}

function startTimer() {
  timerInterval = setInterval(function () {
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

  if (answerBtnsEl) {
    answerBtnsEl.innerHTML = '';

    question.choices.forEach((answer) => {
      const button = document.createElement('button');
      button.innerText = answer;
      button.classList.add('btn');

      // Check if the answer matches the correct answer
      if (answer === question.answer) {
        button.dataset.correct = 'true';
      } else {
        button.dataset.correct = 'false';
      }

      button.addEventListener('click', selectAnswer);
      answerBtnsEl.appendChild(button);
    });
  }
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
  const correct = selectedBtn.dataset.correct === "true";

  setStatusClass(document.body, correct);

  if (correct) {
    score += 10;
    feedbackEl.innerText = "Correct!";
  } else {
    feedbackEl.innerText = "Wrong!";
    secondsLeft -= 10;
  }

 
  scoreEl.innerText = "Score: " + score;

  Array.from(answerBtnsEl.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct === "true");
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
  endScreen.classList.remove("hide");
}


