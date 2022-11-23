var student = new Student;

function Student() {
    this.age = Math.round(Math.random() * 10 +17);
    this.happiness = Math.round(Math.random() * 20 + 10);
    this.satiety = Math.round(Math.random() * 10 + 15);
    this.money = Math.round(Math.random() * 4 + 6 ) * 1000;
    this.knowledge = Math.round(Math.random() * 10);
    this.status = "Бедолага";
    this.isAlive = true;
    
    this.eatTrash = function() {
        this.satiety -= 10;
        this.happiness -= 20;
        this.money -= 100;
        this.cheker();
    }
    this.goHome = function () {
        this.satiety -= 5;
        this.happiness +=5;
        this.cheker();
    }
    this.relax = function() {
        this.happiness += 5;
    }
    this.goLesson = function() {
        this.satiety -= 5;
        this.happiness -= 3;
        this.cheker();
    }
    this.study = function () {
        this.satiety -= 5;
        this.knowledge += 10;
        this.cheker();
    }
    this.eat = function (money) {
        if (this.money - money >= 0) {
            this.money -= money;
            this.happiness +=5;
            this.satiety += 25;
            this.cheker();
        }
    }
    this.watchYouTube = function () {
        this.knowledge -= 5;
        this.happiness += 10;
        this.satiety -= 3;
        this.cheker();
    }
    this.read = function () {
        this.knowledge += 10;
        this.satiety -=2;
        this.cheker();
    }
   
   
    this.checkHappiness = function() {
        if (this.happiness <= 0) {
            this.happiness = 0;
            this.status = 'Dead Inside';
            this.isAlive = false;
        }
    }
    this.checkSatiety = function() {
        if (this.satiety <= 0) {
            this.satiety = 0;
            this.status = 'Голодни';
            this.isAlive = false;
        } else if (this.satiety >= 150) {
            this.satiety = 150;
            this.status = 'Объився';
            this.isAlive = false;
        }
    }
    this.checkMoney = function () {
        if (this.money <= 0 ) {
            this.status = 'Должник';
            this.isAlive = false;
        }
    }
    this.checkKnowledge = function() {
        if (this.knowledge >= 50) {
            this.status = 'ГигаЧад';
        } else if (this.knowledge < 0) {
            this.status = 'а у э';
        }
    }
    this.cheker = function() {
        this.checkHappiness();
        this.checkMoney();
        this.checkSatiety();
        this.checkKnowledge();
    }
}

function createStudent() {
    student = new Student;
}

function updateStat () {
    document.querySelector('.status').innerHTML = `${student.status}`;
    document.querySelector('.age').innerHTML = `Возраст: ${student.age}`;
    document.querySelector('.happiness').innerHTML = `Счастье: ${student.happiness}`;
    document.querySelector('.satiety').innerHTML = `Насыщение: ${student.satiety}`;
    document.querySelector('.money').innerHTML = `Деньги: ${student.money}`;
    document.querySelector('.knowledge').innerHTML = `Знания: ${student.knowledge}`;
}
