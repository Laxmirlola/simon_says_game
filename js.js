let gameSeq = [];
let userSeq = [];

let btns = ["green", "red", "purple", "blue"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");
let allBtns = document.querySelectorAll(".tile");
startBtn = document.querySelector(".start-button");

// Start the game on keypress
startBtn.addEventListener("click", function () {
  if (!started) {
    console.log("Game started");
    started = true;
    levelUp();
  }
});

// Add flash animation for the game sequence
function gameFlash(btn) {
  console.log(btn);
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

// Add flash animation for the user click
function userFlash(btn) {
  console.log(btn);
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 250);
}

// Move to the next level
function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  let randNum = Math.floor(Math.random() * 4);
  let randColor = btns[randNum];
  let randBtn = document.querySelector(`.tile.${randColor}`);

  gameSeq.push(randColor);
  console.log(gameSeq);

  setTimeout(() => gameFlash(randBtn), 500);
}

// Check the user's input against the game sequence
function checkAns(idx) {
  if (gameSeq[idx] === userSeq[idx]) {
    if (gameSeq.length === userSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    const score = document.querySelector(".score");
    h2.innerText = `Game Over! Your score is ${level}. Start again!`;
    score.innerText = `${level}`;

    document.querySelector("body").style.backgroundColor = "#e85d75";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "#2a2a2e";
    }, 150);
    reset();
  }
}

// Handle button clicks by the user
function btnPress() {
  let btn = this;
  userFlash(btn);
  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

// Add event listeners to all tiles
allBtns.forEach((b) => {
  b.addEventListener("click", btnPress);
});

// Reset the game variables
function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
