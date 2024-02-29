
let score = {
  wins: 0,
  losses: 0,
  ties: 0
}; 

const statusResult = {
  statusWins: 'You win!',
  statusLosses: 'You lose!',
  statusTie: 'Tie.'
}

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

// Recupera o conteúdo do objeto armazenado em localstore (localStorage.getItem) e converte em JS notation (JSON.parse). Caso o objeto tenha sido removido, ele executa o || 'defaut operator' zerando as posições.
score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateResult();

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
  document.querySelector('.js-result')
    .innerHTML = `${result}`;
}


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
