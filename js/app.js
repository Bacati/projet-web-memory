const modal = document.querySelector(".modal");
const closeButton = document.querySelector(".close-button");

function toggleModal() {
  modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
  if (event.target === modal) {
      toggleModal();
  }
}

closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

let cardTest = [];
let cards = [
  "ressource/dinosaures/4.jpg",
  "ressource/dinosaures/1.jpg",
  "ressource/dinosaures/2.jpg",
  "ressource/dinosaures/3.jpg",
  "ressource/dinosaures/5.jpg",
  "ressource/dinosaures/6.jpg",
  "ressource/dinosaures/7.jpg",
  "ressource/dinosaures/8.jpg",
  "ressource/dinosaures/9.jpg",
  "ressource/dinosaures/10.jpg",
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

let shuffledCards = shuffle(cards);

function createCards() {
  for (let card of shuffledCards) {
      const li = document.createElement("LI");
      li.classList.add("card");
      const i = document.createElement("i");
      const img = document.createElement("img");
      img.src = card;
      img.classList.add("hidden");
      li.appendChild(img);
      i.classList.toggle("fa");
      if (card === "plane") {
          i.classList.toggle("fa-paper-plane-o");
      }
      const deck = document.querySelector('.deck');
      li.appendChild(i);
      deck.appendChild(li);
  }
}

const ul = document.querySelector('.deck');
let moves = document.querySelector(".moves");
let movesCounter = 0;
let match = 0;
let isfirstClick = true;
let isRestart = false;

function initGame() {
  createCards();
  const card = document.querySelectorAll('.card');
  for (let i = 0; i < card.length; i++) {
      card[i].addEventListener("click", function (event) {
          if (card[i] !== event.target) return;
          if (event.target.classList.contains("show")) return;
          showCard(event.target);
          setTimeout(addCard, 550, shuffledCards[i], event.target, cardTest, i);
      }, false);
  }
}

function showCard(card) {
  card.classList.add('show');
  const img = card.querySelector("img");
  img.classList.remove("hidden");
}


function addCard(card, cardHTML, testList, pos) {
  if (isRestart) {
      testList.length = 0;
      isRestart = false;
  }
  testList.push(card);
  testList.push(cardHTML)
  testList.push(pos);
  if (testList.length === 6) {
      updateMoveCounter();
      testCards(testList[0], testList[1], testList[2], testList[3], testList[4], testList[5]);
      testList.length = 0;
  }
}

function testCards(card1, html1, x1, card2, html2, x2) {
  if (card1 === card2 && x1 != x2) {
      cardsMatch(html1, html2);
  } else {
      cardsDontMatch(html1, html2);
  }
}

function cardsMatch(card1, card2) {
  card1.classList.add('match');
  card2.classList.add('match');
  match++;
  if (match === 10) {
      win();
  }
}

function cardsDontMatch(card1, card2) {
  card1.classList.toggle('no-match');
  card2.classList.toggle('no-match');
  setTimeout(function () {
      card1.classList.toggle('no-match');
      card2.classList.toggle('no-match');
      card1.classList.toggle('show');
      card2.classList.toggle('show');
      const img1 = card1.querySelector("img");
      const img2 = card2.querySelector("img");
      img1.classList.add("hidden");
      img2.classList.add("hidden");
  }, 1000);
}


function win() {
  toggleModal();
  const stats = document.querySelector(".stats");
  if (s % 60 < 10) {
      stats.textContent = "Vous avez gagnez avec : " + movesCounter + " coups";
  } else {
      stats.textContent = "Vous avez gagnez avec " + movesCounter + " coups";
  }
}

function updateMoveCounter() {
  movesCounter++;
  moves.textContent = "Nombre de coups : " + movesCounter;
}

let restart = document.querySelector(".restart");
restart.addEventListener("click", restartGame, false);
function restartGame() {
  movesCounter = 0;
  match = 0;
  s = 0;
  m = 0;
  isfirstClick = true;
  isRestart = true;
  const deck = document.querySelector('.deck');
  var elements = deck.getElementsByClassName("card");

  while (elements[0]) {
      elements[0].parentNode.removeChild(elements[0]);
  }
  shuffledCards = shuffle(cards);
  moves.textContent = "Nombre de coups : " + movesCounter;

  initGame();
}

const newGameButton = document.querySelector(".new-game");
newGameButton.addEventListener("click", newGame);
function newGame() {
  toggleModal();
  restartGame();
}

initGame();

document.addEventListener('keydown', function (event) {
  if (event.code === 'Space') {
    location.reload();
  }
});