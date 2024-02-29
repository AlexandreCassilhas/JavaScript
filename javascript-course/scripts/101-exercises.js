
function changeCSS(kindMedia) {
  if (kindMedia === 'G') {
      document.querySelector('.js-game-button').classList.add('game-button-is-toggled');
      document.querySelector('.js-music-button').classList.remove('game-button-is-toggled');
      document.querySelector('.js-tech-button').classList.remove('game-button-is-toggled');
    } else if (kindMedia === 'M') {
      document.querySelector('.js-music-button'). classList.add('game-button-is-toggled');
      document.querySelector('.js-game-button').classList.remove('game-button-is-toggled');
      document.querySelector('.js-tech-button').classList.remove('game-button-is-toggled');
    } else {
      document.querySelector('.js-tech-button').classList.add('game-button-is-toggled');
      document.querySelector('.js-game-button').classList.remove('game-button-is-toggled');
      document.querySelector('.js-music-button').classList.remove('game-button-is-toggled');
    }
} 

console.log(document.querySelector('.js-button').classList.contains('button-test'));  

// Forma de alterar o css do botão no click
function verifyStatus() {
  
  // verifica se o button contém a classe 'game-button-is-toggled' e guarda na var
  const statusButton = document.querySelector('.game-button').classList.contains('game-button-is-toggled');

console.log(statusButton);

if (!statusButton) {
  document.querySelector('.game-button').classList.add('game-button-is-toggled');
} else {
  document.querySelector('.game-button').classList.remove('game-button-is-toggled');
}

}


