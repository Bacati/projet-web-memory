/*var cards = document.querySelectorAll('.card');
cards.forEach(function(card) {
	card.addEventListener('click', function() {
		card.classList.toggle('is-flipped');
	});
});

//Fonction qui place les éléments du tableau de manière random
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
  }

  return array;
}
const myArray = ["ressource/dinosaures/4.jpg", "ressource/dinosaures/4.jpg", "ressource/dinosaures/1.jpg", "ressource/dinosaures/1.jpg", "ressource/dinosaures/2.jpg", "ressource/dinosaures/2.jpg", "ressource/dinosaures/3.jpg", "ressource/dinosaures/3.jpg", "ressource/dinosaures/5.jpg", "ressource/dinosaures/5.jpg", "ressource/dinosaures/6.jpg", "ressource/dinosaures/6.jpg", "ressource/dinosaures/7.jpg", "ressource/dinosaures/7.jpg", "ressource/dinosaures/8.jpg", "ressource/dinosaures/8.jpg"];
const shuffledArray = shuffle(myArray); 

console.log(shuffledArray);*/




//assign elements of HTML
const cardsBox = document.querySelector(".tabmemory");
const gameOverMessage = document.querySelector(".card");
const restartGameBtn = gameOverMessage.querySelector(
  ".game-over-message__container #btn-restart-game"
);

let cards = [
  "<img src='ressource/dinosaures/4.jpg'>",
  "<img src='ressource/dinosaures/1.jpg'>",
  "<img src='ressource/dinosaures/2.jpg'>",
  "<img src='ressource/dinosaures/3.jpg'>",
];
cards = cards.concat(cards);


function shuffle(cards) {
  var currentIndex = cards.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = cards[currentIndex];
      cards[currentIndex] = cards[randomIndex];
      cards[randomIndex] = temporaryValue;
  }

  return cards;
}
shuffle(cards);

let clickBlocked = false;


function viewTheCards(card) {
  card.classList.add("untapped");
  setTimeout(() => {
    card.classList.remove("untapped");
  });
}

function createBoxCard(cardIcon) {
  const boxCard = document.createElement("div");

  boxCard.classList.add("card__item");

  boxCard.innerHTML = `<div class="card-items-container">
  <span class="card-item__icon">${cardIcon}</span>
  <span class="card-item__cover"></span>
  </div>`;

  return boxCard;
}

cards.forEach((card) => {
  const boxCard = createBoxCard(card);

  cardsBox.appendChild(boxCard);

  boxCard.addEventListener("click", (e) => {
    if (clickBlocked) {
      return;
    }

    clickBlocked = true;

    if (!boxCard.classList.contains("untapped")) {
      boxCard.classList.add("untapped");
    }
  });
});

