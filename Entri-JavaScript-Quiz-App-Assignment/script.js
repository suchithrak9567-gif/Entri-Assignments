
    const questions = [
        {
            question: "What does HTML stand for?",
            options: [
                "Hyper Text Markup Language",
                "High Text Machine Language",
                "Hyperlink Text Markup Language",
                "Home Tool Markup Language"
            ],
            answer: "Hyper Text Markup Language"
        },
        {
            question: "Which language is used to style web pages?",
            options: [
                "HTML",
                "CSS",
                "JavaScript",
                "Python"
            ],
            answer: "CSS"
        },
        {
            question: "Which language is mainly used to make web pages interactive?",
            options: [
                "HTML",
                "CSS",
                "JavaScript",
                "SQL"
            ],
            answer: "JavaScript"
        },
        {
            question: "Which keyword declares a variable that cannot be reassigned?",
            options: [
                "var",
                "let",
                "const",
                "static"
            ],
            answer: "const"
        },
        {
            question: "Which method is used to select an element by its ID?",
            options: [
                "getElementById()",
                "getElement()",
                "queryId()",
                "selectById()"
            ],
            answer: "getElementById()"
        },
        {
            question: "Which symbol is used for a single-line comment in JavaScript?",
            options: [
                "//",
                "/*",
                "#",
                "<!--"
            ],
            answer: "//"
        },
        {
            question: "Which DOM method creates a new HTML element?",
            options: [
                "createElement()",
                "newElement()",
                "makeElement()",
                "addElement()"
            ],
            answer: "createElement()"
        },
        {
            question: "Which event occurs when a user clicks a button?",
            options: [
                "mouseover",
                "submit",
                "click",
                "change"
            ],
            answer: "click"
        }
    ];

    // Variables for quiz state
    let currentQuestion = 0;
    let score = 0;
    let answered = false;

    // DOM elements
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const correctAnswerElement = document.getElementById("correct-answer");
    const nextButton = document.getElementById("next-btn");
    const progressElement = document.getElementById("progress");
    const quizElement = document.getElementById("quiz");
    const resultElement = document.getElementById("result");

    // Render the current question
    function showQuestion() {
        answered = false;

        const current = questions[currentQuestion];

        progressElement.textContent =
            `Question ${currentQuestion + 1} of ${questions.length}`;

        questionElement.textContent = current.question;

        // Clear old options
        optionsElement.innerHTML = "";

        correctAnswerElement.textContent = "";

        // Hide Next button until an option is selected
        nextButton.hidden = true;

        // Dynamically create the four option buttons
        current.options.forEach(function(option) {
            const button = document.createElement("button");

            button.textContent = option;
            button.classList.add("option");

            button.addEventListener("click", function() {
                selectAnswer(button, option);
            });

            optionsElement.appendChild(button);
        });
    }

    // Handle answer selection
    function selectAnswer(selectedButton, selectedAnswer) {
        if (answered) {
            return;
        }

        answered = true;

        const current = questions[currentQuestion];
        const allButtons = document.querySelectorAll(".option");

        if (selectedAnswer === current.answer) {
            selectedButton.classList.add("correct");
            score++;
        } else {
            selectedButton.classList.add("wrong");

            // Reveal the correct answer
            correctAnswerElement.textContent =
                `Correct answer: ${current.answer}`;

            // Highlight the correct option
            allButtons.forEach(function(button) {
                if (button.textContent === current.answer) {
                    button.classList.add("correct");
                }
            });
        }

        // Show Next Question button
        nextButton.hidden = false;
    }

    // Move to the next question
    nextButton.addEventListener("click", function() {
        currentQuestion++;

        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            showResult();
        }
    });

    // Show final score
    function showResult() {
        quizElement.hidden = true;
        resultElement.hidden = false;

        let feedback;

        if (score === 8) {
            feedback = "Excellent! You got every question correct!";
        } else if (score >= 6) {
            feedback = "Great job! You have a strong understanding.";
        } else if (score >= 4) {
            feedback = "Good effort! Keep practicing.";
        } else {
            feedback = "Keep studying and try again!";
        }

        resultElement.innerHTML = `
            <h2>Quiz Complete!</h2>
            <p>You scored ${score} out of ${questions.length}</p>
            <p>${feedback}</p>
        `;

        // Create Restart Quiz button dynamically
        const restartButton = document.createElement("button");
        restartButton.textContent = "Restart Quiz";
        restartButton.id = "restart-btn";

        restartButton.addEventListener("click", restartQuiz);

        resultElement.appendChild(restartButton);
    }

    // Restart the quiz
    function restartQuiz() {
        currentQuestion = 0;
        score = 0;

        resultElement.hidden = true;
        quizElement.hidden = false;

        showQuestion();
    }

    // Start the quiz
    showQuestion();