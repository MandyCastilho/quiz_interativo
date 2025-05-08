const questions = [
  { question: "Qual é a capital do Brasil?", answers: [
      { text: "Rio de Janeiro", correct: false },
      { text: "Brasília", correct: true },
      { text: "São Paulo", correct: false },
      { text: "Salvador", correct: false } ] },
  { question: "Qual linguagem é usada para estilizar páginas web?", answers: [
      { text: "HTML", correct: false },
      { text: "Python", correct: false },
      { text: "CSS", correct: true },
      { text: "PHP", correct: false } ] },
  { question: "Quem é o criador do JavaScript?", answers: [
      { text: "Brendan Eich", correct: true },
      { text: "Tim Berners-Lee", correct: false },
      { text: "Mark Zuckerberg", correct: false },
      { text: "Elon Musk", correct: false } ] }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
const timeLimit = 15;

const startBtn = document.getElementById("start-btn");
const startScreen = document.getElementById("start-screen");
const quizContainer = document.getElementById("quiz-container");
const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const nextButton = document.getElementById("next-btn");
const scoreElement = document.getElementById("score");
const progressBar = document.getElementById("progress-bar");
const timerElement = document.getElementById("timer");

startBtn.addEventListener("click", () => {
  startScreen.classList.add("hide");
  quizContainer.classList.remove("hide");
  startQuiz();
});

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  questions.sort(() => Math.random() - 0.5);
  nextButton.textContent = "Próxima";
  scoreElement.classList.add("hide");
  document.body.classList.toggle("dark-mode", window.matchMedia('(prefers-color-scheme: dark)').matches);
  showQuestion();
}

function showQuestion() {
  resetState();
  startTimer();
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  updateProgressBar();
  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    if (answer.correct) button.dataset.correct = true;
    button.addEventListener("click", selectAnswer);
    answersElement.appendChild(button);
  });
}

function resetState() {
  clearInterval(timer);
  nextButton.classList.add("hide");
  timerElement.textContent = '';
  while (answersElement.firstChild) {
    answersElement.removeChild(answersElement.firstChild);
  }
}

function selectAnswer(e) {
  clearInterval(timer);
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("wrong");
  }
  Array.from(answersElement.children).forEach(button => {
    if (button.dataset.correct === "true") button.classList.add("correct");
    button.disabled = true;
  });
  nextButton.classList.remove("hide");
}

function updateProgressBar() {
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  progressBar.style.width = `${progress}%`;
}

function startTimer() {
  let timeLeft = timeLimit;
  timerElement.textContent = `⏳ ${timeLeft}s`;
  timer = setInterval(() => {
    timeLeft--;
    timerElement.textContent = `⏳ ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      timerElement.textContent = "⏰ Tempo esgotado!";
      autoFailQuestion();
    }
  }, 1000);
}

function autoFailQuestion() {
  Array.from(answersElement.children).forEach(button => {
    if (button.dataset.correct === "true") button.classList.add("correct");
    else button.classList.add("wrong");
    button.disabled = true;
  });
  nextButton.classList.remove("hide");
}

function showScore() {
  resetState();
  questionElement.textContent = "Fim do Quiz!";
  scoreElement.innerHTML = `
    <p>Você acertou ${score} de ${questions.length} perguntas!</p>
    <input type="text" id="player-name" placeholder="Seu nome" />
    <button onclick="saveRanking()">Salvar pontuação</button>
    <div id="ranking"></div>
  `;
  scoreElement.classList.remove("hide");
  nextButton.textContent = "Jogar novamente";
  nextButton.classList.remove("hide");
}

function saveRanking() {
  const name = document.getElementById("player-name").value.trim();
  if (!name) return alert("Digite um nome para salvar!");
  const ranking = JSON.parse(localStorage.getItem("ranking")) || [];
  ranking.push({ name, score });
  ranking.sort((a, b) => b.score - a.score);
  localStorage.setItem("ranking", JSON.stringify(ranking.slice(0, 5)));
  showRanking();
  generateWhatsAppLink(name, score);
}

function showRanking() {
  const ranking = JSON.parse(localStorage.getItem("ranking")) || [];
  const container = document.getElementById("ranking");
  container.innerHTML = "<h3>🏆 Ranking:</h3><ol>" + 
    ranking.map(player => `<li>${player.name} - ${player.score}</li>`).join("") + 
    "</ol>";
}

nextButton.addEventListener("click", () => {
  if (nextButton.textContent === "Jogar novamente") {
    startScreen.classList.remove("hide");
    quizContainer.classList.add("hide");
    return;
  }
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});
  
  
  






