let gameSeq = [];
let userSeq = [];

let btns = ["pink", "orange", "green", "blue"];

let highscore = 0;

let started = false;

let level = 0;
let h2 = document.querySelector("h2");
let h3 = document.querySelector("#highscore");

document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("Game is started");
    started = true;

    levelUp();
  }
});

function gameFlash(btn) {
  btn.classList.add("gameFlash");
  setTimeout(function () {
    btn.classList.remove("gameFlash");
  }, 250);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level: ${level}`;

  let randIdx = Math.floor(Math.random() * 3);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);

  gameSeq.push(randColor); 

  gameFlash(randBtn);
}

function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(function () {
    btn.classList.remove("userFlash");
  }, 250);
}

function btnPress() {
  let btn = this;
  userFlash(btn);

  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `Game Over! Your score is ${level - 1}<br> Press any key to restart`;
    if (level-1 > highscore){
        highscore = level-1;
        h3.innerText = `High Score : ${highscore}`
    }
    document.body.style.backgroundColor = "red"
    setTimeout(function(){
        document.body.style.backgroundColor = "white"
    },200)
    reset();
  }
}

function reset(){
    gameSeq = [];
    userSeq = [];
    started = false;
    level = 0;
}
