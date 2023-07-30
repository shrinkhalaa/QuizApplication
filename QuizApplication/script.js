const quizData = [
    {
        question: "What is the capital of France?",
        options: ["London", "Paris", "Berlin", "Madrid"],
        correct: "Paris"
    },
    {
        question: "What is 5 + 3?",
        options: ["9", "8", "7", "6"],
        correct: "8"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Mars", "Venus", "Saturn", "Jupiter"],
        correct: "Saturn"
    }
];

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next-btn");
const submitButton = document.getElementById("submit-btn");
const backButton = document.getElementById("back-btn");
const clearButton = document.getElementById("clear-btn");
const resultContainer = document.getElementById("result-container");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");
const timeRemainingElement = document.getElementById("time-remaining");

let currentQuestion = 0;
let score = 0;
let timeLeft = 60;
let timerInterval;

function showQuestion() {
    const currentQuiz = quizData[currentQuestion];
    questionElement.textContent = currentQuiz.question;

    optionsElement.innerHTML = "";
    currentQuiz.options.forEach((option) => {
        const label = document.createElement("label");
        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "quiz";
        radio.value = option;

        label.textContent = option;
        label.appendChild(radio);
        optionsElement.appendChild(label);
    });

    updateButtons();
}

function showResult() {
    questionElement.textContent = "Quiz completed!";
    optionsElement.innerHTML = "";

    scoreElement.textContent = score;
    resultContainer.classList.remove("hidden");
    nextButton.style.display = "none";
    backButton.style.display = "none";
    clearButton.style.display = "none";
    submitButton.style.display = "none";
    timerElement.style.display = "none";
}

function updateButtons() {
    if (currentQuestion === 0) {
        backButton.classList.add("hidden");
    } else {
        backButton.classList.remove("hidden");
    }

    if (currentQuestion === quizData.length - 1) {
        nextButton.classList.add("hidden");
        submitButton.classList.remove("hidden");
    } else {
        nextButton.classList.remove("hidden");
        submitButton.classList.add("hidden");
    }

    if (currentQuestion > 0 && currentQuestion < quizData.length - 1) {
        clearButton.classList.remove("hidden");
    } else {
        clearButton.classList.add("hidden");
    }
}

function submitAnswer() {
    const selectedOption = document.querySelector("input[name='quiz']:checked");
    if (!selectedOption) return;

    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].correct) {
        score++;
    }

    currentQuestion++;
    if (currentQuestion < quizData.length) {
        showQuestion();
    } else {
        clearInterval(timerInterval);
        showResult();
    }
}

function submitAnswer() {
    const selectedOption = document.querySelector("input[name='quiz']:checked");
    if (!selectedOption) return;

    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].correct) {
        score++;
    }

    currentQuestion++;
    if (currentQuestion < quizData.length) {
        showQuestion();
    } else {
        clearInterval(timerInterval);
        showResult();
    }
}

function clearAnswer() {
    const allOptions = document.querySelectorAll("input[type='radio']");
    allOptions.forEach((option) => {
        option.checked = false;
    });
}

function goBack() {
    currentQuestion--;
    showQuestion();
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            submitAnswer(); // Automatically submit the quiz when the timer runs out
        }
    }, 1000);
}

function updateTimerDisplay() {
    timeRemainingElement.textContent = timeLeft;
}

function initializeQuiz() {
    showQuestion();
    startTimer();
    updateTimerDisplay();
}

initializeQuiz();











