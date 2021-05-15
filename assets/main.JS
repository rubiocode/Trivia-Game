const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));

let currentQuestion= {};
let acceptingAnswers= true;
let score = 0;
let questionCounter = 0;
let availableQuestions= [];

const correct_bonus = 10;
const max_questions= 5;

let questions = [
    {
        question:"Inside which HTML element do we put the JavaScript?",
        choice1: "<script>",
        choice2:"<javaScript>",
        choice3:"<js>",
        choice4:"<scripting>",
        answer: 1
    }
    {
        question:"What is the correct syntax for referring to external script called 'xxx.js'?",
        choice1: "<script href='xxx.js'>",
        choice2:"<script name='xxx.js'>",
        choice3:"<script src='xxx.js'>",
        choice4:"<script file='xxx.js'>",
        answer: 3
    }
    {
        question:"How do write 'Hello World' in an alert box?",
        choice1: "console.log('Hello World');",
        choice2:"alertBox('Hello World');",
        choice3:"print('Hello World');",
        choice4:"alert('Hello World');",
        answer: 4
    }
    {
        question:"How do you print a message in the console?",
        choice1: "console.log('Hello World');",
        choice2:"console.log(Hello World);",
        choice3:"consoleLog('Hello World');",
        choice4:"Cons('Hello World');",
        answer: 1
    }
    {
        question:"What is considered the language of the browser?",
        choice1: "HTML",
        choice2:"CSS",
        choice3:"Java",
        choice4:"JavaScript",
        answer: 4
    }
]

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}

getNewQuestion = () => {

    questionCounter++;
    const questionIndex = Math.floor(Math.random()*availableQuestions.length);
    currentQuestion=availableQuestions[questionIndex];
    question.innerHTML = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerHTML= currentQuestion["choice" + number];
    })
}

startGame();



