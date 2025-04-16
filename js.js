const questions = [
    { question: "Qual é a capital do Brasil?", options: ["São Paulo", "Brasília", "Rio de Janeiro", "Salvador"], answer: "Brasília" },
    { question: "Qual linguagem é usada para estilizar páginas web?", options: ["HTML", "CSS", "JavaScript", "Python"], answer: "CSS" },
    { question: "Qual destes é um framework JavaScript?", options: ["React", "Flask", "Django", "Laravel"], answer: "React" }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 10; // tempo por pergunta em segundos

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next");
const scoreElement = document.getElementById("score");
const feedbackElement = document.getElementById("feedback");
const quizContainer = document.getElementById("quiz-container");
const timerElement = document.getElementById("timer"); // <span id="timer">
const progressElement = document.getElementById("progress"); // <div id="progress">
const restartButton = document.getElementById("restart"); // <button id="restart">Reiniciar</button>
const bestScoreElement = document.getElementById("best-score"); // <div id="best-score">

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];

    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = "";
    feedbackElement.textContent = "";

    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option-button");
        button.onclick = () => checkAnswer(button, option);
        optionsElement.appendChild(button);
    });

    nextButton.classList.add("hidden");

    updateProgressBar();
    startTimer();
}

function checkAnswer(button, selectedOption) {
    clearInterval(timer); // para o cronômetro ao responder

    const correctAnswer = questions[currentQuestionIndex].answer;
    document.querySelectorAll(".option-button").forEach(btn => btn.disabled = true);

    if (selectedOption === correctAnswer) {
        score++;
        button.classList.add("correct");
        feedbackElement.textContent = "✅ Resposta correta!";
    } else {
        button.classList.add("incorrect");
        feedbackElement.textContent = `❌ Resposta errada! A resposta certa era: ${correctAnswer}`;
    }

    nextButton.classList.remove("hidden");
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showScore();
    }
});

restartButton.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    scoreElement.classList.add("hidden");
    quizContainer.classList.remove("hidden");
    restartButton.classList.add("hidden");
    bestScoreElement.classList.add("hidden");
    loadQuestion();
});

function showScore() {
    quizContainer.classList.add("hidden");
    scoreElement.textContent = `Você acertou ${score} de ${questions.length} perguntas.`;
    scoreElement.classList.remove("hidden");

    // Verifica e salva o melhor score
    const bestScore = localStorage.getItem("bestScore") || 0;
    if (score > bestScore) {
        localStorage.setItem("bestScore", score);
        bestScoreElement.textContent = `🎉 Novo recorde: ${score} acertos!`;
    } else {
        bestScoreElement.textContent = `🏆 Melhor pontuação: ${bestScore} acertos.`;
    }

    bestScoreElement.classList.remove("hidden");
    restartButton.classList.remove("hidden");
}

function startTimer() {
    timeLeft = 10;
    timerElement.textContent = `⏰ Tempo: ${timeLeft}s`;

    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `⏰ Tempo: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            feedbackElement.textContent = "⏱️ Tempo esgotado!";
            document.querySelectorAll(".option-button").forEach(btn => btn.disabled = true);
            nextButton.classList.remove("hidden");
        }
    }, 1000);
}

function updateProgressBar() {
    const percent = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressElement.style.width = percent + "%";
}

