let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScore();

let isAutoPlay = false;
let intervalID;
function autoPlay(){
  if(!isAutoPlay) {
  intervalID = setInterval(() => {
    let pickPlayerMove = pickComputerMove();
    playGame(pickPlayerMove)
  }, 1000);
  document.querySelector('.auto-play').textContent = 'Stop Autoplay'
  isAutoPlay = true; }
  else {
    clearInterval(intervalID);
    document.querySelector('.auto-play').textContent = 'Auto Play'
    isAutoPlay=false;}
  };

// Fungsi untuk menampilkan popup
function showResetPopup() {
  document.getElementById('resetPopup').style.display = 'flex';
}

// Fungsi untuk menyembunyikan popup
function hideResetPopup() {
  document.getElementById('resetPopup').style.display = 'none';
}

// Fungsi untuk reset score
function resetScore() {
  score = { wins: 0, losses: 0, ties: 0 };
  updateScore();    
  localStorage.setItem('score', JSON.stringify(score));
  hideResetPopup();
}



addEventListener('keydown',(e)=>{
if(e.key === 'a'){
  playGame('rock');
} else if(e.key === 's') {
  playGame('paper');
} else if(e.key === 'd'){
  playGame('scissors');
} else if(e.key === 'p'){
  autoPlay();
} else if(e.key === 'Backspace'){
  showResetPopup();
}
})

// Object untuk mapping tombol dan moves
const gameButtons = {
  '.js-rock-button': 'rock',
  '.js-paper-button': 'paper',
  '.js-scissors-button': 'scissors'
};

// Menambahkan event listener untuk tombol game
Object.entries(gameButtons).forEach(([selector, move]) => {
  document.querySelector(selector)
    .addEventListener('click', () => playGame(move));
});

// Event listener untuk auto play
document.querySelector('.auto-play')
  .addEventListener('click', autoPlay);

// Event listeners Reset
document.querySelector('.reset-button')
  .addEventListener('click', showResetPopup);

document.querySelector('.confirm-reset')
  .addEventListener('click', resetScore);

document.querySelector('.cancel-reset')
  .addEventListener('click', hideResetPopup);


function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = '';

  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose.';
    } else if (computerMove === 'paper') {
      result = 'You win.';
    } else if (computerMove === 'scissors') {
      result = 'Tie.';
    }

  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win.';
    } else if (computerMove === 'paper') {
      result = 'Tie.';
    } else if (computerMove === 'scissors') {
      result = 'You lose.';
    }
    
  } else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.';
    } else if (computerMove === 'paper') {
      result = 'You lose.';
    } else if (computerMove === 'scissors') {
      result = 'You win.';
    }
  }

  if (result === 'You win.') {
    score.wins += 1;
  } else if (result === 'You lose.') {
    score.losses += 1;
  } else if (result === 'Tie.') {
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));

  function iconPicked(move) {
    if (move === 'rock') {
      return '<img class="move-icon" src="images/rock-emoji.png" alt="">';
    } else if (move === 'paper') {
      return '<img class="move-icon" src="images/paper-emoji.png" alt="">';
    } else if (move === 'scissors') {
      return '<img class="move-icon" src="images/scissors-emoji.png" alt="">';
    }
  }

  updateScore();
  document.querySelector('.js-result').innerHTML = result;
  document.querySelector('.js-moves').innerHTML = `Player ${iconPicked(playerMove)}  ${iconPicked(computerMove)} Computer`;
}

function pickComputerMove() {
  
  const randomNumber = Math.random();

  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
}

function updateScore() {
  document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}