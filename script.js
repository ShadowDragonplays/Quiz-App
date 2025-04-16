let timer;
let startTime; // Track the start time

function startTimer() {
  const timerDiv = document.getElementById("timer");
  let timeLeft = 60; // 60 seconds
  startTime = Date.now(); // Record the start time

  timer = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timer);
      forceSubmitQuiz(); // Force-submit the quiz when time runs out
    } else {
      timerDiv.textContent = `Time left: ${timeLeft}s`;
    }
    timeLeft--;
  }, 1000);
}

function submitQuiz() {
  const answers = {
    q1: "Delhi",
    q2: "7",
    q3: "CSS",
    q4: "Hyper Text Markup Language",
    q5: "JavaScript",
  };

  let score = 0;
  const form = document.getElementById("quizForm");
  const popup = document.getElementById("popup");
  const popupMessage = document.getElementById("popupMessage");
  const popupTitle = document.getElementById("popupTitle");
  const popupIcon = document.getElementById("popupIcon");
  const booSound = document.getElementById("booSound");
  const yaySound = document.getElementById("yaySound");

  // Check if all questions are answered
  for (const question in answers) {
    const userAnswer = form[question].value;
    if (!userAnswer) {
      popupTitle.textContent = "Incomplete Quiz";
      popupMessage.textContent =
        "Please answer all the questions before submitting!";
      popupIcon.className = ""; // Clear any previous icon
      popup.style.display = "flex";
      return; // Stop submission if any question is unanswered
    }
    if (userAnswer === answers[question]) {
      score++;
    }
  }

  clearInterval(timer); // Stop the timer

  // Calculate the time taken
  const endTime = Date.now();
  const timeTaken = Math.floor((endTime - startTime) / 1000); // Time in seconds

  // Trigger confetti effects and play yay sound if score > 2
  if (score > 2) {
    yaySound.play(); // Play the yay sound

    // Confetti burst effect
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
    });

    // Confetti falling down effect
    const duration = 5 * 1000; // 5 seconds
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 2,
        angle: 90,
        spread: 55,
        origin: { x: Math.random(), y: 0 },
      });
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }

  // Trigger thumbs-down effect and play boo sound if score <= 2
  if (score <= 2) {
    popupIcon.className = "popup-icon thumbs-down"; // Add thumbs-down icon
    booSound.play(); // Play the boo sound
  }

  // Display the modal with the score and time taken
  popupTitle.textContent = "Quiz Result";
  popupMessage.innerHTML = `
    You scored ${score} out of ${Object.keys(answers).length}!<br>
    <small>Time taken: ${timeTaken} seconds</small>
  `;
  popup.style.display = "flex";
}

function forceSubmitQuiz() {
  const answers = {
    q1: "Delhi",
    q2: "7",
    q3: "CSS",
    q4: "Hyper Text Markup Language",
    q5: "JavaScript",
  };

  let score = 0;
  const form = document.getElementById("quizForm");
  const popup = document.getElementById("popup");
  const popupMessage = document.getElementById("popupMessage");
  const popupTitle = document.getElementById("popupTitle");
  const popupIcon = document.getElementById("popupIcon");
  const booSound = document.getElementById("booSound");
  const yaySound = document.getElementById("yaySound");

  // Calculate the score based on answered questions
  for (const question in answers) {
    const userAnswer = form[question].value;
    if (userAnswer === answers[question]) {
      score++;
    }
  }

  // Calculate the time taken
  const endTime = Date.now();
  const timeTaken = Math.floor((endTime - startTime) / 1000); // Time in seconds

  // Trigger confetti effects and play yay sound if score > 2
  if (score > 2) {
    yaySound.play(); // Play the yay sound

    // Confetti burst effect
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
    });

    // Confetti falling down effect
    const duration = 5 * 1000; // 5 seconds
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 2,
        angle: 90,
        spread: 55,
        origin: { x: Math.random(), y: 0 },
      });
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }

  // Trigger thumbs-down effect and play boo sound if score <= 2
  if (score <= 2) {
    popupIcon.className = "popup-icon thumbs-down"; // Add thumbs-down icon
    booSound.play(); // Play the boo sound
  }

  // Display the modal with the score and time taken
  popupTitle.textContent = "Time's Up!";
  popupMessage.innerHTML = `
    You scored ${score} out of ${Object.keys(answers).length}!<br>
    <small>Time taken: ${timeTaken} seconds</small>
  `;
  popup.style.display = "flex";
}

// Close the modal and reset the quiz when the close button is clicked
document.getElementById("closePopup").addEventListener("click", () => {
  const popup = document.getElementById("popup");
  const popupContent = document.querySelector(".popup-content");

  // Add the bounce-out animation
  popupContent.classList.add("closing");

  // Wait for the animation to complete before hiding the pop-up
  setTimeout(() => {
    popup.style.display = "none";
    popupContent.classList.remove("closing"); // Remove the class for future use

    // Reset the quiz
    const form = document.getElementById("quizForm");
    form.reset(); // Reset the form
    clearInterval(timer); // Stop the timer
    startTimer(); // Restart the timer
  }, 600); // Match the duration of the bounceOut animation
  // Display the reset pop-up
  popupTitle.textContent = "Quiz Reset";
  popupMessage.textContent = "The quiz has been reset successfully!";
  popupIcon.className = "popup-icon tick"; // Show the checkmark icon
  popup.style.display = "flex";
});

// Reset the quiz and timer when the reset button is clicked
document.querySelector(".reset").addEventListener("click", () => {
  const form = document.getElementById("quizForm");
  const timerDiv = document.getElementById("timer");
  const popup = document.getElementById("popup");
  const popupMessage = document.getElementById("popupMessage");
  const popupTitle = document.getElementById("popupTitle");
  const popupIcon = document.getElementById("popupIcon");

  // Reset the form
  form.reset();

  // Clear the timer
  clearInterval(timer);

  // Restart the timer
  timerDiv.textContent = "Time left: 60s"; // Reset the timer display
  startTimer(); // Restart the timer

  // Display the reset pop-up
  popupTitle.textContent = "Quiz Reset";
  popupMessage.textContent = "The quiz has been reset successfully!";
  popupIcon.className = "popup-icon tick"; // Show the checkmark icon
  popup.style.display = "flex";
});

// Close the modal and reset the quiz when the close button is clicked
document.getElementById("closePopup").addEventListener("click", () => {
  const popup = document.getElementById("popup");
  popup.style.display = "none";
});

// Start the timer when the page loads
window.onload = startTimer;
