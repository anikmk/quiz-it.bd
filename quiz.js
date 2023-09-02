let quizData = [
    {
        question: "Which language runs in a web browser?",
        a: "C++",
        b: "C#",
        c: "Python",
        d: "JavaScript",
        correct: "d"
    },
    {
        question: "Which language is used for server-side scripting?",
        a: "JavaScript",
        b: "Python",
        c: "PHP",
        d: "HTML",
        correct: "c"
    },
    {
        question: "What does HTML stand for?",
        a: "Hyper Text Markup Language",
        b: "High Tech Modern Language",
        c: "Hyper Transfer Markup Language",
        d: "None of the above",
        correct: "a"
    },
    // Add more questions and answers here
];

// Shuffle the quizData array to randomize the questions
shuffleArray(quizData);

const quiz = document.getElementById('quiz');
const answerEls = document.querySelectorAll('.answer');
const questionEls = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('submit');
const printBtn = document.getElementById('print');

let currentQuiz = 0;
let score = 0;
let userAnswers = [];

loadQuiz();

function loadQuiz() {
    deselecAnswers();
    const currentQuizData = quizData[currentQuiz];

    questionEls.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
}

function deselecAnswers() {
    answerEls.forEach(answerEl => {
        answerEl.checked = false;
    });
}

function getSelected() {
    let answer = undefined;
    answerEls.forEach(answerEl => {
        if (answerEl.checked) {
            answer = answerEl.id;
        }
    });
    return answer;
}

submitBtn.addEventListener('click', () => {
    const answer = getSelected();
    if (answer) {
        userAnswers.push({
            question: quizData[currentQuiz].question,
            selectedAnswer: answer,
            correctAnswer: quizData[currentQuiz].correct
        });

        if (answer === quizData[currentQuiz].correct) {
            score++;
        }
        currentQuiz++;
        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            // Display the score
            alert(`Quiz completed! Your score is ${score} out of ${quizData.length}`);
            location.reload();
        }
    }
});

printBtn.addEventListener('click', () => {
    for (let i = 0; i < quizData.length; i++) {
        userAnswers.push({
            question: quizData[i].question,
            selectedAnswer: null, // User has not answered these questions
            correctAnswer: quizData[i].correct
        });
    }

    // Display user answers
    alert(`User Answers:\n\n${JSON.stringify(userAnswers, null, 2)}`);
});

// Handle window minimize/close event
window.addEventListener('beforeunload', (event) => {
    // Confirm before leaving the page
    event.preventDefault();
    event.returnValue = '';
});

// Shuffle an array using Fisher-Yates algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}