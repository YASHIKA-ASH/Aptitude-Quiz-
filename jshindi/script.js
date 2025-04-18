const questions=[
    {
        Question: "What is the capital of Canada?",
        Answers:[
            {text:"Luanda",correct:false},
            {text:"Ottawa",correct:true},
            {text:"Baku",correct: false},
            {text:"Tirana",correct: false},
]
    },
    {
        Question: "Which desert is the largest in the world?",
        Answers:[
            {text:"Chalbi",correct:false},
            {text:"Danakil",correct:false},
            {text:"Naimb",correct: false},
            {text:"The Sahara",correct: true},
]
    },
    {
        Question: "Who wrote Romeo and Juliet?",
        Answers:[
            {text:"Barbara Cartland",correct:false},
            {text:"Danielle Steel",correct:false},
            {text:"William Shakespeare",correct: true},
            {text:"Agatha Christie",correct: false},
]
    },
    {
        Question: "What language is spoken in Brazil?",
        Answers:[
            {text:"Mandarian",correct:false},
            {text:"Spanish",correct:false},
            {text:"Brazilian",correct: false},
            {text:" Portuguese",correct: true},
]
    },
    {
        Question: "In what year did the Titanic sink?",
        Answers:[
            {text:"1930",correct:false},
            {text:"1912",correct:true},
            {text:"1908",correct: false},
            {text:"1919",correct: false},
]
    }
];
// Select all dots
const dotss = document.querySelectorAll('.dot');

// Listen for the scroll event
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('.content');
  let currentSection = null;

  // Determine which section is currently visible on the screen
  sections.forEach((section, index) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 0 && rect.bottom >= 0) {
      currentSection = index;
    }
  });

  // Mark active dot based on visible section
  if (currentSection !== null) {
    dots.forEach((dot, index) => {
      if (index === currentSection) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }
});
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const startBtn = document.getElementById("startbtn");
let timerInterval = null;
let seconds = 0;
const pagiElement = document.getElementById("pagination");
const timerContainer = document.getElementById("time"); // This is the full <div>
const timerValue = document.getElementById("time-value"); // Just the span with time
// Make sure this exists in your HTML


startBtn.addEventListener("click", () => {
    startScreen.style.display = "none";
    quizScreen.style.display = "block";
    startquiz(); // Start the quiz logic
});
const questionss= document.getElementById("question");
const answers= document.getElementById("ans");
const nextt= document.getElementById("nextbtn");
let currentquestionindex=0;
let points =0;
const dots = document.querySelectorAll('.dot');
const sections = document.querySelectorAll('.section'); // your page sections
  
function formatTime(sec) {
    const hrs = String(Math.floor(sec / 3600)).padStart(2, '0');
    const mins = String(Math.floor((sec % 3600) / 60)).padStart(2, '0');
    const secs = String(sec % 60).padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  }
  
  function startTimer() {
    if (timerInterval !== null) return; // Prevent multiple intervals
  
    timerInterval = setInterval(() => {
      seconds++;
      timerValue.textContent = formatTime(seconds);
    }, 1000);
  }
  
  function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  function startquiz(){
    currentquestionindex=0;
    points =0;
    seconds = 0; // reset timer value
    timerContainer.style.display = "block"; // Show again
timerValue.textContent = formatTime(seconds); // Reset time display
 nextt.innerHTML="NEXT";
    pagiElement.style.display = "block"; 
    document.querySelectorAll('.dot').forEach(dot => {
        dot.classList.remove('visited', 'active');
    });
    document.querySelector('.dot')?.classList.add('active');
    
    startTimer();
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentquestion = questions[currentquestionindex];
    let questionNo=currentquestionindex+1;
    questionss.innerHTML=questionNo+". "+currentquestion.Question;

    currentquestion.Answers.forEach(answer =>{
        const  button =document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        button.innerHTML = `${answer.text}<span class="icon"></span>`;
        answers.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
        answers.appendChild(button);
    });
}
function activeLink() {
    const dots = document.querySelectorAll(".dot");
    dots[index].classList.add("visited");
  
    // Your logic to load the corresponding question, e.g.:
    showQuestion(index); // assuming you have this
  }
  
function resetState()
{
    nextt.style.display="none";
    while (answers.firstElementChild) {
        answers.removeChild(answers.firstElementChild);
    }    
}
 function selectAnswer(e){
    const selectedBtn = e.target.closest('.btn'); 
    const isCorrect= selectedBtn.dataset.correct ==="true";
    const iconSpan = selectedBtn.querySelector(".icon");
    if(isCorrect){
        selectedBtn.classList.add("correct" );
        const checkImg = document.createElement("img");
checkImg.src = "https://img.icons8.com/?size=96&id=63262&format=png";
checkImg.alt = "Correct";
checkImg.classList.add("icon-img");
iconSpan.appendChild(checkImg);
points++;
    }else{
        selectedBtn.classList.add("Incorrect","shake");
        const wrongi=document.createElement("img");
        wrongi.src="https://img.icons8.com/?size=96&id=63688&format=png";
        wrongi.classList.add("icon-img");
        iconSpan.appendChild(wrongi);

    }
 Array.from(answers.children).forEach(btn => {
    btn.disabled = true;
    if (btn !== selectedBtn) {
        const isAnswerCorrect = btn.dataset.correct === "true";
        if (isAnswerCorrect) {
            btn.classList.add("correct"); // Mark as green if correct
        } else {
            btn.classList.add("Incorrect"); // Mark as red if incorrect
        }
    }
    const dots = document.querySelectorAll(".dot");
    dots[currentquestionindex].classList.add("visited");
});

nextt.style.display = "block";
}
    function showscore() {

        stopTimer();
    
        timerContainer.style.display = "none";

    
    
    
        // Clear question section and reset states
        resetState();
        questionss.innerHTML = "";
    
        // Create and style the score message
        const scoreText = document.createElement("div");
        const timeText = document.createElement("div");
    
        if (points === 5) {
            scoreText.textContent = `Wowww!!! Your score is ${points} out of 5! 🎉`;
            scoreText.style.color = "green";
        } else if (points >= 3) {
            scoreText.textContent = `Good job! Your score is ${points} out of 5. 👍`;
            scoreText.style.color = "orange";
        } else {
            scoreText.textContent = `Your score is ${points} out of 5. Better luck next time! 💪`;
            scoreText.style.color = "red";
        }
    
        // Display time taken
        timeText.textContent = `Time Taken: ${formatTime(seconds)}`;
        timeText.style.marginTop = "10px";
        timeText.style.fontWeight = "bold";
        timeText.style.color = "#555";
    
        // Append both elements to the screen
        questionss.appendChild(scoreText);
        questionss.appendChild(timeText);
        pagination.innerHTML = "";
        pagiElement.style.display = "none";
        // Setup Play Again button
        nextt.innerHTML = "PLAY AGAIN";
        nextt.style.display = "block";
       
    }    
    function handlenextt() {
        currentquestionindex++; 
        // Mark current as visited before moving on
        if (currentquestionindex < questions.length) {
            showQuestion(); // Show current question
 // Move to next for next click
        } else {
            showscore();
        }
    }
    
    nextt.addEventListener("click", () => {
        if (currentquestionindex < questions.length) {
            handlenextt();
        } else {
            startquiz();
        }
    })   



