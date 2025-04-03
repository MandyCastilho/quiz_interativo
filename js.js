const questions = [
    { question: "Qual é a capital do Brasil?", options: ["São Paulo", "Brasília", "Rio de Janeiro", "Salvador"], answer: "Brasília" },
    { question: "Qual linguagem é usada para estilizar páginas web?", options: ["HTML", "CSS", "JavaScript", "Python"], answer: "CSS" },
    { question: "Qual destes é um framework JavaScript?", options: ["React", "Flask", "Django", "Laravel"], answer: "React" }
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next");
const scoreElement = document.getElementById("score");
const feedbackElement = document.getElementById("feedback");
const quizContainer = document.getElementById("quiz-container");

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
}

function checkAnswer(button, selectedOption) {
    const correctAnswer = questions[currentQuestionIndex].answer;

    // Desativa todos os botões após resposta
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

function showScore() {
    quizContainer.classList.add("hidden");
    scoreElement.textContent = `Você acertou ${score} de ${questions.length} perguntas.`;
    scoreElement.classList.remove("hidden");
}

// Carregar a primeira pergunta
loadQuestion();
