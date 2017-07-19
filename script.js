function CardElements(title, body) {
  this.title = title;
  this.body = body;
  this.id = Date.now();
  this.quality = 'Swill';
}

// create empty array []
var cardArray = []

function addCards (buildCard) {
  $('.idea-card-parent').prepend(
`<article class="idea-card" id="${buildCard.id}">
  <h2>${buildCard.title}</h2>


<div id="delete">
</div>
    <p class="body-text">${buildCard.body}</p>
  <div class="ratings">
<div id="upvote">
</div>

<div id="downvote"
</div>
    <p class="quality">quality: <span class="qualityRating">${buildCard.quality}</span></p>
    <hr>
  </div>
</article>`);
}

function storeCards() {
  localStorage.setItem("array", JSON.stringify(cardArray));
}

function fireCards (event) {
  event.preventDefault ();
  var newCard = new CardElements ($('.title-input').val(), $('.body-input').val());
  // console.log(newCard);
  cardArray.push(newCard)
  addCards(newCard);
  // console.log(cardArray);
  storeCards();
}

// climb and find id
// pull the quality value from the index that that value lives on in the array
// function upVote() {
//   var newQuality;
//   cardArray.forEach(function (card) {
//   if (card.id == currentQuality) {
//     if (card.quality === 'Swill') {
//       card.quality === 'Plausible'
//       newQuality === card.quality;
//   } else if (card.quality === 'Plausible') {
//       card.quality === 'Genius'
//       newQuality === card.quality;
//   } else {
//     card.quality === 'Genius'
// }}
//   })
// };



function downVote () {
  var currentQuality = this.quality;
  if (currentQuality === 'swill') {
  $('.qualityRating').text('swill')
} else if (currentQuality === 'plausible') {
  $('.qualityRating').text('swill')
} else if (currentQuality === 'genius') {
  $('.qualityRating').text('plausible')
} else {
  $('.qualityRating').text('swill')
 }
};


function upvoteListener(event) {
  event.preventDefault ()
  // console.log("click")
  upVote()
}

function downvoteListener(event) {
  event.preventDefault ()
  $(this).parents('.idea-card')
  downVote()
}

// function deleteCard() {
//
// }


$('.save-btn').on('click', fireCards)


$('.idea-card-parent').on('click', '#delete', function(){
  var cardId = $(this).closest('.idea-card')[0].id
cardArray.forEach(function (card, index){
if (cardId == card.id){
  cardArray.splice(index, 1)
}
})
storeCards()
$(this).parents('.idea-card').remove()
})



$('.idea-card-parent').on('click', '#upvote', function (){
  var cardId = $(this).closest('.idea-card')[0].id
  console.log(cardId)
  var newQuality;
  cardArray.forEach(function (card, index) {
  if (card.id == cardId) {
    if (card.quality === 'Swill') {
      card.quality === 'Plausible'
      newQuality === card.quality;
  } else if (card.quality === 'Plausible') {
      card.quality === 'Genius'
      newQuality === card.quality;
  } else {
    card.quality === 'Genius'
}}
  })
});






$('.idea-card-parent').on('click', '#downvote', downvoteListener)



// clear input fields after prepend
function clearInputs() {
  $('.title-input').val('');
  $('.body-input').val('');
  $('title-input').focus();
}
