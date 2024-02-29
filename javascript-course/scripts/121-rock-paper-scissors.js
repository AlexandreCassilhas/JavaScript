let result = '';

let score = {
  wins: 0,
  losses: 0,
  ties: 0
}; 

const statusResult = {
  statusWins: 'You win!',
  statusLosses: 'You lose!',
  statusTie: 'Tie.'
};

const resetButtonElement = document.querySelector('.js-reset-button');
resetButtonElement.addEventListener('click', () => {
  if (confirm('Are you sure?')) {
    resetFunction();
  };
});

function resetFunction() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  // remove 'score' from localStorage
  localStorage.removeItem('score');
  // Limpa o resultado em 'js-result'
  document.querySelector('.js-result').innerHTML = '';
  // Limpa a linha de movimentação em 'js-move'
  document.querySelector('.js-move').innerHTML = '';
  // Mostra o score zerado, depois de zerar as var.
  document.querySelector('.js-score')
      .innerHTML = `Wins: ${score.wins} Losses: ${score.losses} Ties: ${score.ties}`;  
}

// Inicializando as variáveis que vão controlar o auto-play
let isAutoPlaying = false;
let intervalId;

// Usando o 'addEventListener' invés do 'Onclick'.
document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('Rock');
});

document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('Paper');
});

document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    playGame('Scissors');
});

// Vamos usar as teclas "r", "p" e "s" para jogar.
document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('Rock');
    event.stopPropagation;
  } else if (event.key === 'p') {
    playGame('Paper');
    event.stopPropagation;
  } else if (event.key === 's') {
    playGame('Scissors');
    event.stopPropagation;
  } else if (event.key === 'a') {
    autoPlay();
  } else if (event.keyCode === 8) {
    if (confirm('Are you sure?')) {
      resetFunction();
    };
  };
});


// Recupera o conteúdo do objeto armazenado em localstore (localStorage.getItem) e converte em JS notation (JSON.parse). Caso o objeto tenha sido removido, ele executa o || 'defaut operator' zerando as posições.
score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateResult();

const autoPlayButtonElement = document.querySelector('.js-auto-play-button');
autoPlayButtonElement.addEventListener('click', () => {
  autoPlay();
});

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(function() {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
    autoPlayButtonElement.innerHTML = 'Stop Play';
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    autoPlayButtonElement.innerHTML = 'Auto Play';
  }
}




function playGame(playerMove) {
  const computerMove = pickComputerMove();

  if (playerMove === 'Scissors') {
    if (computerMove === 'Rock') {
      result = statusResult.statusLosses;
    } else if (computerMove === 'Paper') {
      result = statusResult.statusWins;
    } else if (computerMove === 'Scissors') {
      result = statusResult.statusTie;
    }

  } else if (playerMove === 'Paper') {
    if (computerMove === 'Rock') {
      result = statusResult.statusWins;
    } else if (computerMove === 'Paper') {
      result = statusResult.statusTie;
    } else if (computerMove === 'Scissors') {
      result = statusResult.statusLosses;
    }
    
  } else if (playerMove === 'Rock') {
    if (computerMove === 'Rock') {
      result = statusResult.statusTie;
    } else if (computerMove === 'Paper') {
      result = statusResult.statusLosses;
    } else if (computerMove === 'Scissors') {
      result = statusResult.statusWins;
    }
  }
  // incrementando o score. Usando o objeto 'score'
  if (result === statusResult.statusWins) {
    score.wins += 1;
  } else if (result === statusResult.statusLosses) {
    score.losses += 1;
  } else if (result === statusResult.statusTie) {
    score.ties += 1;
  }

  // armazena o conteúdo do objeto 'score' em um localStore chamado 'score'. Transforma em string
  localStorage.setItem('score', JSON.stringify(score));
  
  updateResult();
    
  document.querySelector('.js-move')
      .innerHTML = `You
<img src="images/${playerMove}-emoji.png" class="move-icon">
<img src="images/${computerMove}-emoji.png" class="move-icon">
Computer`;
          
  document.querySelector('.js-score')
      .innerHTML = `Wins: ${score.wins} Losses: ${score.losses} Ties: ${score.ties}`;  

}

function updateResult() { 
  document.querySelector('.js-result').innerHTML = `${result}`;
};


function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = '';
  let result = '';      

  if (randomNumber >= 0 && randomNumber < 1/3) {
    computerMove = 'Rock';
  } else if (randomNumber >= 1/3 && randomNumber < 2/3) {
    computerMove = 'Paper';
  } else {
    computerMove = 'Scissors';
  }
  // aqui você retorna o valor da variável "computerMove"
  return computerMove;
}
