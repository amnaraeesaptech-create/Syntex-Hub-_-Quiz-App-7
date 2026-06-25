const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyper Text Markup Language", correct: true },
            { text: "High Text Machine Language", correct: false },
            { text: "Home Tool Markup Language", correct: false },
            { text: "Hyperlinks Text Mark Language", correct: false }
        ]
    },
    {
        question: "Which language is used for styling web pages?",
        answers: [
            { text: "HTML", correct: false },
            { text: "CSS", correct: true },
            { text: "Python", correct: false },
            { text: "Java", correct: false }
        ]
    },
    {
        question: "Which language is used for web interactivity?",
        answers: [
            { text: "CSS", correct: false },
            { text: "JavaScript", correct: true },
            { text: "C++", correct: false },
            { text: "SQL", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;

    nextButton.innerHTML = "Next";
    restartButton.classList.add("hide");

    showQuestion();
}

function showQuestion() {
    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");

        button.innerHTML = answer.text;
        button.classList.add("btn");

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);

        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    answerButtons.innerHTML = "";
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const correct = selectedBtn.dataset.correct === "true";

    if (correct) {
        score++;
        selectedBtn.style.backgroundColor = "green";
    } else {
        selectedBtn.style.backgroundColor = "red";
    }

    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;

        if (button.dataset.correct === "true") {
            button.style.backgroundColor = "green";
        }
    });

    nextButton.style.display = "block";
}

function showScore() {
    resetState();

    if (score === 0) {
        questionElement.innerHTML =
            `😔 Better Luck Next Time! You scored 0 out of ${questions.length}.`;
    }
    else if (score === questions.length) {
        questionElement.innerHTML =
            `🏆 Perfect Score! You answered all questions correctly.`;
    }
    else {
        questionElement.innerHTML =
            `🎉 Congratulations! You scored ${score} out of ${questions.length}.`;
    }

    nextButton.style.display = "none";
    restartButton.classList.remove("hide");
}

function handleNextButton() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    handleNextButton();
});

restartButton.addEventListener("click", startQuiz);

startQuiz();