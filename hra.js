import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4';

let isCurrentTurnCircle = true;
const currentPlayerImageCircle = document.createElement('img');
currentPlayerImageCircle.setAttribute('src', 'circle.svg');
currentPlayerImageCircle.classList.add('image_navigation_bar');

const currentPlayerImageCross = document.createElement('img');
currentPlayerImageCross.setAttribute('src', 'cross.svg');
currentPlayerImageCross.classList.add('image_navigation_bar');

const playingAreaElement = document.querySelector('.playing_area');
const currentPlayerElement = document.querySelector('.current_player');
currentPlayerElement.appendChild(currentPlayerImageCircle);

const checkWinner = () => {
  const allItems = document.querySelectorAll('.playing_area_item');
  const findWinnerInput = [];
  allItems.forEach((item) => {
    if (item.classList.contains('playing_area_item--circle')) {
      findWinnerInput.push('o');
    } else if (item.classList.contains('playing_area_item--cross')) {
      findWinnerInput.push('x');
    } else {
      findWinnerInput.push('_');
    }
  });
  const winner = findWinner(findWinnerInput);
  if (winner === 'o') {
    alert('Vyhrálo kolečko. Gratuluji!');
    location.reload();
  } else if (winner === 'x') {
    alert('Vyhrál křížek. Gratuluji!');
    location.reload();
  } else if (winner === 'tie') {
    alert('Nikdo nevyhrál. Smůla. Zkus to znovu.');
    location.reload();
  }
};

for (let i = 0; i < 100; i++) {
  const button = document.createElement('button');
  button.classList.add('playing_area_item');
  button.addEventListener('click', (event) => {
    if (isCurrentTurnCircle) {
      button.classList.add('playing_area_item--circle');
      isCurrentTurnCircle = false;
      currentPlayerElement.removeChild(currentPlayerImageCircle);

      currentPlayerElement.appendChild(currentPlayerImageCross);
    } else {
      button.classList.add('playing_area_item--cross');
      isCurrentTurnCircle = true;
      currentPlayerElement.removeChild(currentPlayerImageCross);

      currentPlayerElement.appendChild(currentPlayerImageCircle);
    }
    event.target.disabled = true;
    setTimeout(checkWinner, 300);
  });

  playingAreaElement.appendChild(button);
}
