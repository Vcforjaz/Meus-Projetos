const state ={
 score:{
    playerScore: 0,
    computerScore: 0,
    scoreBox: document.getElementById("score_points"),
 },
 cardSprites: {
    avatar: document.getElementById("card-image"),
    name: document.getElementById("card-name"),
    type: document.getElementById("card-type"),
 },
 fieldCards: {
    player: document.getElementById("player-field-card"),
    computer: document.getElementById("computer-field-card"),
 },
 playerSides: {
   player1: "player-cards",
   computer: "computer-cards",
   player1BOX: document.querySelector("#player-cards"),
   computerBOX: document.querySelector("#computer-cards"),
},
 actions: {
    button: document.getElementById("next-duel"),
 },

};
/*
let bgm = document.getElementById("bgm")
bgm.play();
*/
const pathImages = "./projetosDIO/yugioh-Game/src/assets/icons/";
const cardData= [
{
   id:0,
   name: "Blue Eyes White Dragon",
   type: "Paper",
   img: `${pathImages}dragon.png`,
   WinOf: [1],
   LoseOf: [2],
},
{
   id:1,
   name: "Dark Magician",
   type: "Rock",
   img: `${pathImages}magician.png`,
   WinOf: [2 ],
   LoseOf: [1],
},
{
   id:2,
   name: "Exodia",
   type: "Scissors",
   img: `${pathImages}exodia.png`,
   WinOf: [0],
   LoseOf: [1],
},
];
async function getRandomCardId() {
   const randomIndex = Math.floor(Math.random() * cardData.length);
   return cardData[randomIndex].id;
}

async function createCardImage(IdCard, fieldSide){
const cardImage = document.createElement("img");
cardImage.setAttribute("height", "100px");
cardImage.setAttribute("src", "./projetosDIO/yugioh-Game/src/assets/icons/card-back.png");
cardImage.setAttribute("data-id", IdCard);
cardImage.classList.add("card");

if(fieldSide === state.playerSides.player1){

   cardImage.addEventListener("mouseover", () => {
      drawSelectCard (IdCard);
   });
    
   cardImage.addEventListener("click", () => {
      setCardsField(cardImage.getAttribute("data-id"));
   });
}

return cardImage;
}

async function hiddenCardDetails(){
   state.cardSprites.avatar.src = "";
   state.cardSprites.name.innerText = "";
   state.cardSprites.type.innerText = "";
}

async function drawCardsInField(cardId, computerCardId) {
state.fieldCards.player.src = cardData[cardId].img;
state.fieldCards.computer.src = cardData[computerCardId].img;
}
async function ShowHiddenCardFieldsImages(value){
   if (value === true) {
      state.fieldCards.computer.style.display = "block";
      state.fieldCards.player.style.display = "block";
   
   }
   async function ShowHiddenCardFieldsImages(value){
      if (value === false) {
         state.fieldCards.computer.style.display = "none";
         state.fieldCards.player.style.display = "none";
      
      }
}
}
async function setCardsField(cardId) {
   
   await removeAllCardsImages();

   let computerCardId = await getRandomCardId();

   await ShowHiddenCardFieldsImages(true);

   await hiddenCardDetails();

   await drawCardsInField(cardId, computerCardId);

    let duelResults = await checkDuelResults(cardId, computerCardId);

    await updateScore();
    await drawButton(duelResults);
}

async function drawButton(text) {
   state.actions.button.innerText = text.toUpperCase();
   state.actions.button.style.display = "block";
}

async function checkDuelResults(playerCardId, computerCardId){
   let duelResults = "Draw";
   let playerCard = cardData[playerCardId];

   if(playerCard.WinOf.includes(computerCardId)){
      duelResults = "Win";
      state.score.playerScore++;
   }

   if(playerCard.LoseOf.includes(computerCardId)) {
      duelResults = "Lose";
      state.score.computerScore++;
   }

   await playAudio(duelResults)
   return duelResults;
}
async function resetduel(){
state.cardSprites.avatar.src = "";
state.actions.button.style.display = "none";

state.fieldCards.player.style.display = "none";
state.fieldCards.computer.style.display = "none";
init ();
}

async function playAudio(status) {
const audio = new Audio(`./projetosDIO/yugioh-Game/src/assets/audios/${status}.wav`)

audio.play();
}

async function updateScore(){
state.score.scoreBox.innerText = `Win: ${state.score.playerScore} | Lose: ${state.score.computerScore}`
}

async function  removeAllCardsImages(){
   let {computerBOX, player1BOX } = state.playerSides;
   let imgElements = computerBOX.querySelectorAll("img");
   imgElements.forEach((img) => img.remove());

   //cards = state.playerSides.player1BOX;
   imgElements = player1BOX.querySelectorAll("img");
   imgElements.forEach((img) => img.remove());
}

async function drawSelectCard(index){
   state.cardSprites.avatar.src = cardData[index].img;
   state.cardSprites.name.innerText = cardData[index].name;
   state.cardSprites.type.innerText = "Attribute : " + cardData[index].type;
}

async function drawCards(cardNumbers, fieldSide) {
   for(let i = 0; i < cardNumbers; i++){
      const randomIdCard = await getRandomCardId();
      const cardImage = await createCardImage(randomIdCard, fieldSide);

      document.getElementById(fieldSide).appendChild(cardImage);

   }
}

const startbtn = document.getElementById("startbtn");
const content = document.getElementById("content");
const loader = document.getElementById("loader");
const music = document.getElementById("bgm");

//Add an event listner to the start button
startbtn.addEventListener("click", () => {
  //Show the loader and hide the button
  //loader.style.display = "none";
  startbtn.style.display = "none";
  //Wait for the music to start 
  music.play().then(() => {
    //Hide the loader and show the content
    content.style.display = "";
    //loader.style.display = "none";
  });
});

function init() {
   ShowHiddenCardFieldsImages(false);
   drawCards(5, state.playerSides.player1);
   drawCards(5, state.playerSides.computer);
}

init();
