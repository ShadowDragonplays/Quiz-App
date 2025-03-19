function submitQuiz() {
  const answers = {
    q1: "Delhi",
    q2: "7",
    q3: "CSS",
    q5: "JavaScript",
    q4: "Hyper Text Markup Language",
  };

  let score = 0;
  const form = document.getElementById("quizForm");
  const resultDiv = document.getElementById("result");

  // Check if all questions are answered
  for (const question in answers) {
    const userAnswer = form[question].value;
    if (!userAnswer) {
      alert("Please answer all the questions before submitting!");
      return; // Stop submission
    }
    if (userAnswer === answers[question]) {
      score++;
    }
  }

  resultDiv.textContent = `You scored ${score} out of ${
    Object.keys(answers).length
  }!`;
}

// Reset the score and result when the reset button is clicked
document.querySelector(".reset").addEventListener("click", () => {
  const resultDiv = document.getElementById("result");
  resultDiv.textContent = ""; // Clear the result text
});
