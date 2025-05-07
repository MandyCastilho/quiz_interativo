const questions = [
    { question: "Qual é a capital do Brasil?", options: ["São Paulo", "Brasília", "Rio de Janeiro", "Salvador"], answer: "Brasília" },
    { question: "Qual linguagem é usada para estilizar páginas web?", options: ["HTML", "CSS", "JavaScript", "Python"], answer: "CSS" },
    { question: "Qual destes é um framework JavaScript?", options: ["React", "Flask", "Django", "Laravel"], answer: "React" }
];

let currentQuestionIndex = 0;
let score = 0;
let bestScore = localStorage.getItem("bestScore") || 0;
let timer;
let timeLeft = 10;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next");
const scoreElement = document.getElementById("score");
const feedbackElement = document.getElementById("feedback");
const quizContainer = document.getElementById("quiz-container");
const timerElement = document.getElementById("timer");
const progressBar = document.getElementById("progress");
const bestScoreElement = document.getElementById("best-score");
const restartButton = document.getElementById("restart");
const skipButton = document.getElementById("skip");
const timeProgressBar = document.getElementById("time-progress");

function startTimer() {
    timeLeft = 10;
    timerElement.textContent = `⏰ Tempo: ${timeLeft}s`;
    updateTimeProgress();
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `⏰ Tempo: ${timeLeft}s`;
        updateTimeProgress();

        if (timeLeft <= 0) {
            clearInterval(timer);
            feedbackElement.textContent = `⏱️ Tempo esgotado! A resposta certa era: ${questions[currentQuestionIndex].answer}`;
            document.querySelectorAll(".option-button").forEach(btn => btn.disabled = true);
            nextButton.classList.remove("hidden");
        }
    }, 1000);
}

function updateTimeProgress() {
    const percent = (timeLeft / 10) * 100;
    timeProgressBar.style.width = `${percent}%`;
    timeProgressBar.style.backgroundColor = percent <= 30 ? "red" : percent <= 60 ? "orange" : "green";
}

function updateProgressBar() {
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
    progressBar.textContent = `Pergunta ${currentQuestionIndex + 1} de ${questions.length}`;
}

function loadQuestion() {
    clearInterval(timer);
    startTimer();
    updateProgressBar();

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
}

function checkAnswer(button, selectedOption) {
    clearInterval(timer);
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

skipButton.addEventListener("click", () => {
    clearInterval(timer);
    feedbackElement.textContent = `➡️ Você pulou! A resposta certa era: ${questions[currentQuestionIndex].answer}`;
    document.querySelectorAll(".option-button").forEach(btn => btn.disabled = true);
    nextButton.classList.remove("hidden");
});

function showScore() {
    quizContainer.classList.add("hidden");
    scoreElement.textContent = `Você acertou ${score} de ${questions.length} perguntas.`;
    scoreElement.classList.remove("hidden");

    let message;
    const percentage = (score / questions.length) * 100;

    if (percentage === 100) {
        message = "👑 Perfeição! Você arrasou demais!";
    } else if (percentage >= 70) {
        message = "🔥 Mandou muito bem!";
    } else if (percentage >= 40) {
        message = "💪 Quase lá! Bora praticar mais.";
    } else {
        message = "😅 Tá na hora de estudar mais um pouquinho.";
    }

    feedbackElement.textContent = message;

    if (score > bestScore) {
        bestScore = score;
        localStorage.setItem("bestScore", bestScore);
        bestScoreElement.textContent = `🏆 Nova melhor pontuação: ${bestScore}`;
    } else {
        bestScoreElement.textContent = `💡 Sua melhor pontuação é: ${bestScore}`;
    }

    bestScoreElement.classList.remove("hidden");
    restartButton.classList.remove("hidden");
}

restartButton.addEventListener("click", () => {
    if (confirm("Deseja realmente reiniciar o quiz?")) {
        currentQuestionIndex = 0;
        score = 0;
        quizContainer.classList.remove("hidden");
        scoreElement.classList.add("hidden");
        bestScoreElement.classList.add("hidden");
        restartButton.classList.add("hidden");
        feedbackElement.textContent = "";
        loadQuestion();
    }
});

const startButton = document.getElementById("start");

startButton.addEventListener("click", () => {
    startButton.style.display = "none"; // Esconde o botão de início
    quizContainer.style.display = "block"; // Mostra o quiz
    loadQuestion(); // Carrega a primeira pergunta
});



