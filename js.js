const questions = [
    {
      question: "Qual é a capital do Brasil?",
      answers: [
        { text: "Rio de Janeiro", correct: false },
        { text: "Brasília", correct: true },
        { text: "São Paulo", correct: false },
        { text: "Salvador", correct: false }
      ]
    },
    {
      question: "Qual linguagem é usada para estilizar páginas web?",
      answers: [
        { text: "HTML", correct: false },
        { text: "Python", correct: false },
        { text: "CSS", correct: true },
        { text: "PHP", correct: false }
      ]
    },
    {
      question: "Quem é o criador do JavaScript?",
      answers: [
        { text: "Brendan Eich", correct: true },
        { text: "Tim Berners-Lee", correct: false },
        { text: "Mark Zuckerberg", correct: false },
        { text: "Elon Musk", correct: false }
      ]
    }
  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  const questionElement = document.getElementById("question");
  const answersElement = document.getElementById("answers");
  const nextButton = document.getElementById("next-btn");
  const scoreElement = document.getElementById("score");
  
  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.textContent = "Próxima";
    scoreElement.classList.add("hide");
    showQuestion();
  }
  
  function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
  
    currentQuestion.answers.forEach(answer => {
      const button = document.createElement("button");
      button.textContent = answer.text;
      if (answer.correct) {
        button.dataset.correct = true;
      }
      button.addEventListener("click", selectAnswer);
      answersElement.appendChild(button);
    });
  }
  
  function resetState() {
    nextButton.classList.add("hide");
    while (answersElement.firstChild) {
      answersElement.removeChild(answersElement.firstChild);
    }
  }
  
  function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
  
    if (isCorrect) {
      selectedBtn.classList.add("correct");
      score++;
    } else {
      selectedBtn.classList.add("wrong");
    }
  
    Array.from(answersElement.children).forEach(button => {
      if (button.dataset.correct === "true") {
        button.classList.add("correct");
      }
      button.disabled = true;
    });
  
    nextButton.classList.remove("hide");
  }
  
  function showScore() {
    resetState();
    questionElement.textContent = "Fim do Quiz!";
    scoreElement.textContent = `Você acertou ${score} de ${questions.length} perguntas! 🧠`;
    scoreElement.classList.remove("hide");
    nextButton.textContent = "Jogar novamente";
    nextButton.classList.remove("hide");
  }
  
  nextButton.addEventListener("click", () => {
    if (nextButton.textContent === "Jogar novamente") {
      startQuiz();
      return;
    }
  
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showScore();
    }
  });
  
  startQuiz();
  
  
  






