const choices = ['rock', 'paper', 'scissors'];
const userCircles = document.querySelectorAll('.circle');
const resultContainer = document.getElementById('result');
const userChoiceDiv = document.getElementById('user-choice');
const computerChoiceDiv = document.getElementById('computer-choice');
const resultText = document.getElementById('result-text');
const playAgainBtn = document.getElementById('play-again-btn');
const gameBoard = document.querySelector('.container');
const playerScoreSpan = document.getElementById('computer-score');
const computerScoreSpan = document.getElementById('player-score');
const nextBtn = document.getElementById('next-btn');
const rulesPopup = document.getElementById('rules-popup');
const crossSymbol = document.getElementById('cross-symbol');
const rulesBtn = document.getElementById('rules-btn');

let gameLocked = false;

let playerScore = parseInt(localStorage.getItem('playerScore')) || 0;
let computerScore = parseInt(localStorage.getItem('computerScore')) || 0;

updateScore();

userCircles.forEach(circle => {
  circle.addEventListener('click', () => {
    if (gameLocked) return;

    const userChoice = circle.classList.contains('rock') ? 'rock' :
      circle.classList.contains('paper') ? 'paper' :
        'scissors';

    const computerChoice = choices[Math.floor(Math.random() * 3)];
    showResult(userChoice, computerChoice);
    gameLocked = true;
  });
});

function getWinner(user, computer) {
  if (user === computer) return 'TIE UP';
  if (
    (user === 'rock' && computer === 'scissors') ||
    (user === 'paper' && computer === 'rock') ||
    (user === 'scissors' && computer === 'paper')
  ) {
    return 'YOU WIN AGAINST PC';
  }
  return 'YOU LOST AGAINST PC';
}

function showResult(user, computer) {
  const winner = getWinner(user, computer);
  const userWins = winner === 'YOU WIN AGAINST PC';
  const pcWins = winner === 'YOU LOST AGAINST PC';
  const isTie = winner === 'TIE UP';

  gameBoard.classList.add('hidden');
  resultContainer.classList.remove('hidden');

  userChoiceDiv.innerHTML = getImageHTML(user, userWins, true);
  computerChoiceDiv.innerHTML = getImageHTML(computer, pcWins, true);

  if (isTie) {
    document.querySelector('.main-result').textContent = 'TIE UP';
    document.querySelector('.sub-result').textContent = '';
    playAgainBtn.textContent = 'REPLAY';
  } else {
    const parts = winner.split(' ');
    document.querySelector('.main-result').textContent = parts.slice(0, 2).join(' ');
    document.querySelector('.sub-result').textContent = parts.slice(2).join(' ');
    playAgainBtn.textContent = 'PLAY AGAIN';

    if (userWins) {
      playerScore++;
      nextBtn.classList.remove('hidden');
    } else {
      computerScore++;
    }

    localStorage.setItem('playerScore', playerScore);
    localStorage.setItem('computerScore', computerScore);
  }

  updateScore();
}

function getImageHTML(choice, isWinner = false, isResultView = false) {
  const imageMap = {
    rock: `<img src="/fist.png" width="60" alt="rock">`,
    paper: `<img src="/paper.png" width="55" alt="paper">`,
    scissors: `<img src="/scissors.png" width="35" alt="scissors">`
  };

  const borderColor = {
    rock: '#2479b0',
    paper: '#f4a325',
    scissors: '#b429d0'
  };

  const winnerClass = isWinner ? 'winner' : '';
  const extraRing = isWinner ? '<span></span>' : '';
  const sizeStyle = isResultView ? 'style="width: 140px; height: 140px; border-width: 16px;' : 'style="';

  return `<div class="circle ${choice} ${winnerClass}" ${sizeStyle} border-color: ${borderColor[choice]};">${imageMap[choice]}${extraRing}</div>`;
}

function updateScore() {
  playerScoreSpan.textContent = computerScore;
  computerScoreSpan.textContent = playerScore;
}

playAgainBtn.addEventListener('click', () => {
  resultContainer.classList.add('hidden');
  gameBoard.classList.remove('hidden');
  nextBtn.classList.add('hidden');
  gameLocked = false;
});

crossSymbol.addEventListener('click', () => {
  rulesPopup.classList.add('hidden');
});

rulesBtn.addEventListener('click', () => {
  rulesPopup.classList.remove('hidden')
})