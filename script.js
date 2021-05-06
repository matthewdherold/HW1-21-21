var startButton = $("#startButton");
var quizBox = $("#quizBox");
var titleBox = $("#titleBox");
var scoreBox = $("#scoreBox");
var scoreSubmit = $("#scoreSubmit");
var timer = 60;
var score = 0;
var questionCounter = 0
var highScores = JSON.parse(window.localStorage.getItem("highScores")) || [{score: 10, name: "Bob"}, {score: 80, name: "Jimmy"}, {score: 300, name: "Mr Perfect"}];
var questions = [
    `<h2>What pair of symbols do you use to wrap an array?</h2>`,
    `<h2>What is the correct syntax for checking if 2 values are equal?</h2>`,
    `<h2>How would you print out information to be used to testing and debugging?</h2>`,
    `<h2>What is the standard JavaScript syntax for getting an element from an html page by it's ID?</h2>`
];
var answers = [
    `<ul>
    <li><button id='a'>( )</button></li>
    <li><button id='b'>[ ]</button></li>
    <li><button id='c'>< ></button></li>
    <li><button id='d'>{ }</button></li>
    </ul>`,
    `<ul>
    <li><button id='a'>=</button></li>
    <li><button id='b'>==</button></li>
    <li><button id='c'>===</button></li>
    <li><button id='d'>::</button></li>
    </ul>`,
    `<ul>
    <li><button id='a'>dev.print</button></li>
    <li><button id='b'>user.print</button></li>
    <li><button id='c'>console.log</button></li>
    <li><button id='d'>document.log</button></li>
    </ul>`,
    `<ul>
    <li><button id='a'>document(getElementByID{"element"})</button></li>
    <li><button id='b'>getElementByID(document:"element")</button></li>
    <li><button id='c'>getElementByID({document} , "element")</button></li>
    <li><button id='d'>document.getElementByID("element")</button></li>
    </ul>`
];
var answerSheet = [
    `b`,
    `c`,
    `c`,
    `d`
];

setHighScores = () => {
    highScores.sort(function(a, b) {
        return b.score - a.score;
      });
    scoreBox.empty();
    scoreBox.append(`<ol><li>` + highScores[0].name + `: ` + highScores[0].score + `</li>
                        <li>` + highScores[1].name + `: ` + highScores[1].score + `</li>
                        <li>` + highScores[2].name + `: ` + highScores[2].score + `</li></ol>`);
};

currentAnswer = (input) => {
    var correctChoice = answerSheet[questionCounter];
    if (correctChoice === input) {
        score += 10;
        questionCounter += 1;
        console.log(questionCounter)
        userAnswers();
    } else {
        timer -= 10;
        titleBox.empty();
        titleBox.append("<h1>" + (timer--) + " seconds remaining!" + "</h1>");
    };
};

finishQuiz = (interval) => {
    clearInterval(interval)
    timerBonus = timer*2;
    score += timerBonus
    timer = 0
    titleBox.empty();
    titleBox.append("<h1>" + "You scored " + score + " points!" + "</h1>");
    quizBox.empty();
    quizBox.append(`<h3>Save your score? </h3><input type="text" id="scoreInput"><button id=scoreSubmit>Submit`);
    setHighScores();
    scoreSubmit = $("#scoreSubmit");
    scoreSubmit.click(function() {
        var scoreName = scoreInput.value.trim();
        if (scoreName !== "") {
            var newScore = {
                score: score,
                name: scoreName
              };
            highScores.push(newScore);
            window.localStorage.setItem("highScores", JSON.stringify(highScores));
            location.reload();

        setHighScores();
        } else {
            quizBox.append(`<h3>Please enter a valid name </h3>`);
        };
    });
};

startButton.click(function() {
    console.log("start quiz");
    var interval = setInterval(function(i){
        if (timer >= 0) {
        titleBox.empty();
        titleBox.append("<h1>" + (timer--) + " seconds remaining!" + "</h1>");
    } else {
            finishQuiz(interval);
        };
    },1000);
    userAnswers = () => {
        if (questionCounter === questions.length) {
            finishQuiz(interval);
        } else {
        scoreBox.empty()
        scoreBox.append(`<h4>Current Score: ` + score + `</h4>`);
        quizBox.empty();
        quizBox.append(questions[questionCounter] + answers[questionCounter]);
        var choiceA = $("#a");
        var choiceB = $("#b");
        var choiceC = $("#c");
        var choiceD = $("#d"); 
        choiceA.click(function() {
            currentAnswer("a");
        });
        choiceB.click(function() {
            currentAnswer("b");
        });
        choiceC.click(function() {
            currentAnswer("c");
        });
        choiceD.click(function() {
            currentAnswer("d");
        });
    };
    };
    userAnswers();
    titleBox.empty();
    titleBox.append("<h1>" + (timer) + " seconds remaining!" + "</h1>");
});

setHighScores();