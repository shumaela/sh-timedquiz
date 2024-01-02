document.addEventListener('DOMContentLoaded', function () {
  const startButton = document.getElementById('start-btn');
  const questionContainer = document.getElementById('question-container');
  const optionsContainer = document.getElementById('options-container');
  const resultContainer = document.getElementById('result-container');
  const resultText = document.getElementById('result-text');
  const timerContainer = document.getElementById('timer-container');
  const timerDisplay = document.getElementById('time');
  const submitButton = document.getElementById('submit-btn');
  const initialsInput = document.getElementById('initials');

  let currentQuestionIndex = 0;
  let timer;
  let timeRemaining = 60; // in seconds
  let score = 0;

  const questions = [
    {
      question: 'What is the capital of France?',
      options: ['Paris', 'Berlin', 'Rome', 'Madrid'],
      correctAnswer: 'Paris',
    },
    {
      question: 'What is the capital of Australia?',
      options: ['Canberra', 'Sydney', 'Melbourne', 'Perth'],
      correctAnswer: 'Canberra',
    },
    {
      question: 'What is the capital of Japan?',
      options: ['Osaka', 'Kyoto', 'Nagoya', 'Tokyo'],
      correctAnswer: 'Tokyo',
    },
    {
      question: 'What is the capital of Switzerland?',
      options: ['Zurich', 'Geneva', 'Bern', 'Thun'],
      correctAnswer: 'Bern',
    },
    {
      question: 'What is the capital of Malaysia?',
      options: ['Kuala Lumpur', 'Kuching', 'George Town', 'Putrajaya'],
      correctAnswer: 'Kuala Lumpur',
    },
    // Add more questions as needed
  ];

  startButton.addEventListener('click', startQuiz);
  submitButton.addEventListener('click', submitScore);

  function startQuiz() {
    startButton.classList.add('hide');
    timerContainer.classList.remove('hide');
    questionContainer.classList.remove('hide');
    loadQuestion();
    timer = setInterval(updateTimer, 1000);
  }

  function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById('question-text').innerText = currentQuestion.question;

    optionsContainer.innerHTML = '';
    currentQuestion.options.forEach((option) => {
      const button = document.createElement('button');
      button.innerText = option;
      button.addEventListener('click', () => checkAnswer(option));
      optionsContainer.appendChild(button);
    });
  }

  function checkAnswer(selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];

    if (selectedOption === currentQuestion.correctAnswer) {
      score += 20;
    } else {
      timeRemaining -= 15;
      if (timeRemaining < 0) {
        timeRemaining = 0;
      }
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
      loadQuestion();
    } else {
      endQuiz();
    }
  }

  function endQuiz() {
    clearInterval(timer);
    questionContainer.classList.add('hide');
    resultContainer.classList.remove('hide');
    resultText.innerText = `Your Score: ${score}`;
  }

  function updateTimer() {
      timeRemaining--;

      if (timeRemaining <= 0) {
        endQuiz();
      } else {
        timerDisplay.innerText = timeRemaining;
      }
    }


  function submitScore() {
    const initials = initialsInput.value.trim();

    if (initials !== '') {
      // Update the result text to display initials and score
      resultText.innerText = `Your Score: ${score} | Initials: ${initials}`;
      // you can save the initials and score as needed (e.g., localStorage, server-side, etc.)
      console.log(`Initials: ${initials}, Score: ${score}`);
    }
  }
});
