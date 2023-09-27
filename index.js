const playingAreaElement = document.querySelector('.playing_area');
const playingAreaItemElement = document.querySelector('.playing_area_item');
for (let i = 0; i < 99; i++) {
  const clone = playingAreaItemElement.cloneNode();
  playingAreaElement.appendChild(clone);
}
