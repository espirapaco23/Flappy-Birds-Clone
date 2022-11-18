document.addEventListener("DOMContentLoaded", () => {
  const bird = document.querySelector(".bird");
  const game = document.querySelector(".game");
  const ground = document.querySelector(".ground");

  let birdLeft = 220;
  let birdBottom = 100;
  let gravity = 2;
  let isGameOver = false;
  let gap = 400;

  function start() {
    birdBottom -= gravity;
    bird.style.bottom = birdBottom + "px";
    bird.style.left = birdLeft + "px";
  }
  let gameTimerId = setInterval(start, 20);

  function control(e) {
    if (e.keyCode === 32) {
      jump();
    }
  }

  function jump() {
    if (birdBottom < 500) birdBottom += 50;
    bird.style.bottom = birdBottom + "px";
  }
  document.addEventListener("keyup", control);

  function addPipe() {
    let randomHeight = Math.random() * 60;
    let pipeLeft = 500;
    let pipeBottom = randomHeight;
    const pipe = document.createElement("div");
    const topPipe = document.createElement("div");
    if (!isGameOver) {
      pipe.classList.add("pipe");
      topPipe.classList.add("topPipe");
    }
    game.appendChild(pipe);
    game.appendChild(topPipe);
    pipe.style.left = pipeLeft + "px";
    topPipe.style.left = pipeLeft + "px";
    pipe.style.bottom = pipeBottom + "px";
    topPipe.style.bottom = pipeBottom + gap + "px";

    function movePipe() {
      pipeLeft -= 2;
      pipe.style.left = pipeLeft + "px";
      topPipe.style.left = pipeLeft + "px";

      if (pipeLeft === -60) {
        clearInterval(timerId);
        game.removeChild(pipe);
        game.removeChild(topPipe);
      }
      if (
        (pipeLeft > 200 &&
          pipeLeft < 280 &&
          birdLeft === 220 &&
          (birdBottom < pipeBottom + 15 + 100 ||
            birdBottom > pipeBottom + gap - 200)) ||
        birdBottom === 0
      ) {
        gameOver();
        clearInterval(timerId);
      }
    }
    let timerId = setInterval(movePipe, 20);
    if (!isGameOver) setTimeout(addPipe, 3000);
  }
  addPipe();

  function gameOver() {
    clearInterval(gameTimerId);
    isGameOver = true;
    document.removeEventListener("keyup", control);
  }
});
