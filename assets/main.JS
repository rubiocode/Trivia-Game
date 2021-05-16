/*Defining global variables and questions object*/

/*timer vars */
var timerEl = document.getElementById('question-counter');
var mainEl = document.querySelector('.timer-prefix');
var timeLeft = 50;

/*choices var */

const choices = Array.from(document.getElementsByClassName("choice-text"));
const containerEl = document.getElementById("trivia");
const choiceEl1=document.getElementById("choice1");
const choiceEl2=document.getElementById("choice2");
const choiceEl3=document.getElementById("choice3");
const choiceEl4=document.getElementById("choice4");


choiceEl1.addEventListener("click", checkAnswer);
choiceEl2.addEventListener("click", checkAnswer);
choiceEl3.addEventListener("click", checkAnswer);
choiceEl4.addEventListener("click", checkAnswer);

/*results vars */
const resultsContainer= document.getElementById("results");

/*scores var */
let score = 0;


const correct_bonus = 10;


/*question vars */
const question = document.getElementById("question");
let currentQuestion= {};
let questionCounter = 0;
let availableQuestions= [];
let questionIndex = 0;
const max_questions= 5;
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

/* fuction to start the game to reset score and timer and to got through the array of questions object*/
startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}

/*function to access questions from JS and replace text in HTML*/
getNewQuestion = () => {

    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];

        choice.innerText= currentQuestion["choice" + number];
    });
}

function checkAnswer (event){
    event.preventDefault();
    const questionEL=availableQuestions[questionIndex];
    const dataNumber=event.target.getAttribute("data-number");
    if (questionEL === parseInt(dataNumber)) {
        score++;
    } else {
        timeLeft -=15;
    }
    questionIndex++;
    if(questionIndex < availableQuestions.length) {
        getNewQuestion();
    } else {
        showResults();
    }
}
startGame();

/*when question wrong deduct time from timer and move to next question*/ 
/*missing timer and highscores*/ 

// Timer that counts down from 5
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

function showResults() {
    containerEl.style.display='none';
}




