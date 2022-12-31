import cardsData from "./data/cardsData.js";
const selectBlock = document.querySelector(".select-level");
const mainContainer = document.querySelector(".main__container");
selectBlock.addEventListener("click", (e) => {
   switch (e.target.textContent.trim()) {
      case "Easy":
         sortCardsData(cardsData.slice(0, 5));
         break;
      case "Medium":
         sortCardsData(cardsData.slice(0, 10));
         break;
      case "Hard":
         sortCardsData(cardsData);
   }
});
const sortCardsData = (data) => {
   data = [...data, ...data];
   data.sort(() => Math.random() - 0.5);
   generateData(data);
};
const createCard = (src, cardsContainer, config) => {
   const card = document.createElement("div");
   const cardImg = document.createElement("img");
   const cardBack = document.createElement("div");
   card.appendChild(cardImg);
   card.appendChild(cardBack);
   card.className = config.card;
   cardImg.className = config.img;
   cardBack.className = config.back;
   cardImg.alt  = config.id
   cardBack.textContent = '?'
   card.dataset.id = config.id;
   cardImg.src = src;
   cardsContainer.appendChild(card);
   flipCard(card);
};
const flipCard = (card) => {
   setTimeout(() => {
      card.classList.add("card--flip");
      mainContainer.style.pointerEvents = "none";
      setTimeout(() => {
         card.classList.remove("card--flip");
         mainContainer.style.pointerEvents = "all";
         card.addEventListener("click", (e) => {
            card.classList.toggle("card--flip");
            checkAnswer(e.target.parentElement);
         });
      }, 5000);
   }, 1000);
};
const generateData = (cardData) => {
   mainContainer.innerHTML = ''
   const cardsContainer = document.createElement("div");
   cardsContainer.className = "cards-container";
   cardData.forEach((cardObj) => {
      createCard(cardObj.img, cardsContainer, {
         card: "card",
         img: "card__img",
         back: "card__back",
         id: cardObj.cardId,
      });
   });
   mainContainer.append(cardsContainer);
};
const checkAnswer = (target) => {
   target.classList.add("flipped");
   const flippedCards = document.querySelectorAll(".flipped");
   if (flippedCards.length === 2) {
      const [firstCard, secondCard] = flippedCards;
      if (firstCard.dataset.id === secondCard.dataset.id) {
         flippedCards.forEach((card) => {
            setTimeout(() => {
               card.innerHTML = "";
               card.classList.remove("flipped", "card--flip");
               const allCards = document.querySelectorAll('.card')
               restartGame(allCards)
            }, 700);
         });
      } else {
         flippedCards.forEach((card) => {
            card.classList.remove("flipped");
            setTimeout(() => {
               card.classList.remove("card--flip");
            }, 700);
         });
      }
   }
};
const restartGame = (allCards) => {
    if(Array.from(allCards).every(card => card.innerHTML === '')){
        window.location.reload()
    }
}