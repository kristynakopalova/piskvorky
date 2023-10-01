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

for (let i = 0; i < 100; i++) {
  const button = document.createElement('button');
  button.classList.add('playing_area_item');
  if (i < 10) {
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
    });
  }
  playingAreaElement.appendChild(button);
}
