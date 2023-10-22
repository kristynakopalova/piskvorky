import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4';

let winner = null;

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

const createInputBoard = () => {
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
  return findWinnerInput;
};

const showAlert = () => {
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

const checkWinner = () => {
  const findWinnerInput = createInputBoard();
  const winner = findWinner(findWinnerInput);
  return winner;
};

for (let i = 0; i < 100; i++) {
  const button = document.createElement('button');
  button.classList.add('playing_area_item');
  button.addEventListener('click', async (event) => {
    event.target.disabled = true;

    if (isCurrentTurnCircle) {
      button.classList.add('playing_area_item--circle');
      isCurrentTurnCircle = false;
      currentPlayerElement.removeChild(currentPlayerImageCircle);

      currentPlayerElement.appendChild(currentPlayerImageCross);

      winner = checkWinner();
      if (winner != null) {
        setTimeout(showAlert, 300);
        return;
      }

      const response = await fetch(
        'https://piskvorky.czechitas-podklady.cz/api/suggest-next-move',
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            board: createInputBoard(),
            player: 'x',
          }),
        },
      );
      const data = await response.json();
      const allItems = document.querySelectorAll('.playing_area_item');
      const index = data.position.x + data.position.y * 10;
      allItems[index].click();
    } else {
      button.classList.add('playing_area_item--cross');
      isCurrentTurnCircle = true;
      currentPlayerElement.removeChild(currentPlayerImageCross);

      currentPlayerElement.appendChild(currentPlayerImageCircle);
      winner = checkWinner();
      if (winner != null) {
        setTimeout(showAlert, 300);
        return;
      }
    }
  });

  playingAreaElement.appendChild(button);
}
