var correntTextIndex = 0,
correntQuestionIndex = 0,
day = 1;
function questTextHandler() {
    
    var question = quest[correntQuestionIndex];

    if (correntTextIndex + 1 <= question.text.length-1 ) {
        swapQuestText();
    } else if (question.exit) {
        exitQuest(question);
    } else  {
        askQuestionText(question);
    }
}

function swapQuestText () {
    correntTextIndex +=1;
    var question = quest[correntQuestionIndex];

    document.getElementById("questText").innerHTML = question.text[correntTextIndex][0];
    document.getElementById('picture').src = 'img/' + question.text[correntTextIndex][1];
}

function askQuestionText(question) {
    actionHandler(question.action);
    document.getElementById("questText").innerHTML = question.ask;
    document.getElementById('nextTextQuest').classList.add('hide');
    createAnswers(question);
}

function createAnswers(question) {
    for (var i = 0; i < question.answer.length; i++) {
        var button = document.createElement('div');
        button.className = 'questButton';
        button.id = `${i}`;
        button.innerHTML = question.answer[i];
        button.addEventListener('click', questIndexHandler);
        document.querySelector('.answerQuestButtonArea').appendChild(button);
    }
}
function exitQuest(question) {

    actionHandler(question.action);
    updateStat();
    
    document.getElementById('nextTextQuest').classList.add('hide');

    beginButton = document.querySelector('.beginButton');
    document.getElementById("questText").innerHTML = `Концовка дня:"${question.end}"`;
    
    beginButton.classList.remove('hide');
    beginButton.classList.add('restartButtton');
    beginButton.innerHTML = 'Начать заного';

    if (student.isAlive) {
        document.querySelector('.continueButton').classList.remove('hide');
    };
}

function continueQuest() {
    correntTextIndex = 0;
    correntQuestionIndex = 0;
    day += 1;

    var question = quest[correntQuestionIndex];
    document.getElementById("questText").innerHTML = question.text[correntTextIndex][0];
    document.getElementById('picture').src = 'img/' + question.text[correntTextIndex][1];
        
    document.querySelector('.continueButton').classList.add('hide');
    document.querySelector('.beginButton').classList.add('hide');

    document.querySelector('.dayCounter').innerHTML = `День ${day}`;

    document.getElementById('nextTextQuest').classList.remove('hide');
}

function questIndexHandler() {
    correntTextIndex = 0;

    document.getElementById('nextTextQuest').classList.remove('hide');
    
    correntQuestionIndex = quest[correntQuestionIndex].nextStep[event.target.id];
    var deleteButton = document.querySelectorAll('.questButton');
    for (var i = 0; i < deleteButton.length; i ++) {
        deleteButton[i].remove();
    }
    
    document.getElementById("questText").innerHTML = quest[correntQuestionIndex].text[correntTextIndex][0];
    document.getElementById("picture").src = 'img/' + quest[correntQuestionIndex].text[correntTextIndex][1];
}


function beginQuest() {
    correntTextIndex = 0,
    correntQuestionIndex = 0;
    
    var nextQuestTextButton = document.getElementById('nextTextQuest');
    nextQuestTextButton.addEventListener('click', questTextHandler);
    nextQuestTextButton.classList.remove('hide');

    document.querySelector('.beginButton').classList.add('hide');

    document.getElementById("picture").src = 'img/' + quest[correntQuestionIndex].text[correntTextIndex][1];
    document.getElementById("questText").innerHTML = quest[correntQuestionIndex].text[correntTextIndex][0];

    document.querySelector('.dayCounter').innerHTML = 'День 1.';
    day = 1;

    document.querySelector('.continueButton').classList.add('hide');

    createStudent();
    updateStat();
}
function actionHandler(action) {
    switch (action) {
        case 'relax' : 
            student.relax();
            break;
        case 'goLesson' :
            student.goLesson();
            break;
        case 'eatRest':
            student.eat(student.money - 100);
            break;
        case 'eat' :
            student.eat(100);
            break;
        case 'eatTrash':
            student.eatTrash();
            break;
        case 'eat&goHome':
            student.eat(100);
            student.goHome();
            break;
        case 'eatInHome':
            student.eat(0);
            break;
        case 'goHome':
            student.goHome();
            break;
        case 'read':
            student.read();
            break;
        case 'watchYouTube':
            student.watchYouTube();
            break;
    }
    updateStat();
}