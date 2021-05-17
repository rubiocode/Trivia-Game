/*Defining global variables*/

const choices = Array.from(document.getElementsByClassName("choice-text"));
const choiceEl1=document.getElementById("choice1");
const choiceEl2=document.getElementById("choice2");
const choiceEl3=document.getElementById("choice3");
const choiceEl4=document.getElementById("choice4");
const containerEl = document.getElementById("trivia");
const correct_bonus = 10; 
const finalScoreEl= document.querySelector('#finalScore')
const highScores= JSON.parse(localStorage.getItem('highScores')) ||[];
const highScoreListEl = document.getElementById ('highScoreList1');
const max_high_scores = 10;
const max_questions= 5;
const mostRecentScore= localStorage.getItem('mostRecentScore');
const question = document.getElementById("question");
const resultsContainer= document.getElementById("results");
const scoreText = document.querySelector('#scoreID');
const username = document.querySelector('#username');

let availableQuestions= [];
let currentQuestion= {};
let mainEl = document.querySelector('.timer-prefix');
let questionCounter = 0;
let questionIndex = 0;
let saveButton = document.getElementById("save");
let score = 0;
let timerEl = document.getElementById('question-counter');
let timeLeft = 50;


/*click event creating two responses created individual click events to prevent double response */
choiceEl1.addEventListener("click", checkAnswer);
choiceEl2.addEventListener("click", checkAnswer);
choiceEl3.addEventListener("click", checkAnswer);
choiceEl4.addEventListener("click", checkAnswer);

/*event listeners */

document.getElementById("begin").addEventListener("click", resetTimer);

/*questions var */
let questions = [
    {
        question:"Inside which HTML element do we put the JavaScript?",
        choice1: "<script>",
        choice2:"<javaScript>",
        choice3:"<js>",
        choice4:"<scripting>",
        answer: 1
    },
    {
        question:"What is the correct syntax for referring to external script called 'xxx.js'?",
        choice1:"<script href='xxx.js'>",
        choice2:"<script name='xxx.js'>",
        choice3:"<script src='xxx.js'>",
        choice4:"<script file='xxx.js'>",
        answer: 3
    },
    {
        question:"How do write 'Hello World' in an alert box?",
        choice1:"console.log('Hello World');",
        choice2:"alertBox('Hello World');",
        choice3:"print('Hello World');",
        choice4:"alert('Hello World');",
        answer: 4
    },
    {
        question:"How do you print a message in the console?",
        choice1:"console.log('Hello World');",
        choice2:"console.log(Hello World);",
        choice3:"consoleLog('Hello World');",
        choice4:"Cons('Hello World');",
        answer: 1
    },
    {
        question:"What is considered the language of the browser?",
        choice1:"HTML",
        choice2:"CSS",
        choice3:"Internet",
        choice4:"JavaScript",
        answer: 4
    },
]

/* FUNCTIONS*/

// Start game

startGame = () => {
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
    resetTimer();
}

// get new questions from object and insert in HTML
getNewQuestion = () => {
    
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;
    
    choices.forEach(choice => {
        const number = choice.dataset["number"];
        
        choice.innerText= currentQuestion["choice" + number];
    });
}     

//Check answer if correct add score if incorrect subtract time from timer
function checkAnswer (event){
    event.preventDefault();
    const questionEL=availableQuestions[questionIndex];
    const dataNumber=event.target.getAttribute("data-number");
    if (questionEL.answer === parseInt(dataNumber)) {
        incrementScore(correct_bonus);
    } else {
        timeLeft -=15;
    }
    questionIndex++;
    if(questionIndex < availableQuestions.length) {
        getNewQuestion();
    } else {
        showResults();
        resetTimer();
        localStorage.setItem('mostRecentScore', score)
    }
}

// hides question container from HTML
function showResults() {
    containerEl.style.display='none';
    finalScoreEl.innerText=score;
}

//saving scores to Local storage
function saveHighScore(event) {
    event.preventDefault();

    const score1 = {
        score1: score,
        name: username.value,
    };
    console.log("score1", score1);

highScores.push(score1);

highScores.sort((a,b)=> b.score1 -a.score1);

highScores.splice (10);

    localStorage.setItem("highScores", JSON.stringify(highScores));
};

highScoreListEl.innerHTML = highScores
.map (highScore1 => {
return `<li class="high-score"> ${highScore1.name} - ${highScore1.score1}</li>`;
});

/*UTILITIES */
// Score function to make sure score increments by 10 for correct answers
incrementScore = num => {
    score +=num;
    scoreText.innerText=score;
    finalScoreEl.innerText=score;
}

// Timer function countdown from 50 to 0
function countdown() {
    // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    var timeInterval = setInterval(function () {
     // Set the `textContent` of `timerEl` to show the remaining seconds
    timerEl.textContent = timeLeft + " sec";
    // Decrement `timeLeft` by 1
    timeLeft--;
    if ((timeLeft <=0) || (questionIndex >5)) {
        clearInterval(timeInterval);
        showResults();
        }
    }, 1000);
}

//reset function to reset timer once game is reloaded and when is over 

function resetTimer() {
    timeLeft= 50;
    countdown();
    }

//save button click event to disable butto at not entry and to save scores
username.addEventListener('keyup', ()=>{
    saveButton.disabled = !username.value;   
});

saveButton.addEventListener("click", function(event) {
    event.preventDefault();
    saveHighScore();
});

startGame();


