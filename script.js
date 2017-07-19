function CardElements(title, body) {
  this.title = title;
  this.body = body;
  this.id = Date.now();
  this.quality = 'Swill';
}


$(window).on('load', function(){
  console.log('working!!!');
  retrieveLocalStorage();
  clearInputs();
})

// create empty array []
var cardArray = []

function addCards (buildCard) {
  $('.idea-card-parent').prepend(
`<article class="idea-card" id="${buildCard.id}">
  <h2 contenteditable="true">${buildCard.title}</h2>


<div id="delete">
</div>
    <p class="body-text" contenteditable="true">${buildCard.body}</p>
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


function fireCards () {
  var newCard = new CardElements ($('.title-input').val(), $('.body-input').val());
  // console.log(newCard);
  cardArray.push(newCard)
  addCards(newCard);
  console.log(cardArray);
  storeCards();
  clearInputs();
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


$('.idea-card-parent').on('click', '#delete', function(){
  var currentCardId = $(this).closest('.idea-card')[0].id
cardArray.forEach(function (card, index){
if (currentCardId == card.id){
  cardArray.splice(index, 1)
}
})
storeCards()
$(this).parents('.idea-card').remove()
})

$('.idea-card-parent').on('click', '#upvote', function (event){
  event.preventDefault();
  var cardId = $(this).closest('.idea-card')[0].id
  console.log(cardId)
  var newQuality;
  cardArray.forEach(function (card) {
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

// $('.idea-card-parent').on('click', '#downvote', downvoteListener)


$('.idea-card-parent').on('click', '#upvote', function() {
  var cardId = $(this).closest('idea-card')[0].id
  console.log(CardId)
  var newQuality;
  cardArray.forEach(function (card, index){
    if (card.id == cardId) {
      if (card.quality === 'Swill') {
        card.quality === 'Plausible'
        newQuality === card.quality;
      } else if (card.quality === 'Plausible') {
        card.quality === 'Genius'
        newQuality === 'Genius'
      }
    }
  })
});

function storeCards() {
  console.log("before storing card: ", cardArray)
  localStorage.setItem('array', JSON.stringify(cardArray));
  console.log("after storing card: ", cardArray)
  clearInputs()

};
// clear input fields after prepend
function clearInputs() {
  $('.title-input').val('');
  $('.body-input').val('');
  $('title-input').focus();
}




// retrieve card from local storage
// WE WANT THIS TO FIRE ON PAGE LOAD?
function retrieveLocalStorage() {
  cardArray = JSON.parse(localStorage.getItem('array')) || [] ;
  cardArray.forEach(function(card) {
    addCards (card);
  })
}

  $('.search-input').on('keyup',searchCards)

// search
function searchCards() {
  var search = $(this).val().toUpperCase();
  var results = cardArray.filter(function(newCard) {
    return newCard.title.toUpperCase().includes(search) || newCard.body.toUpperCase().includes(search) ||
    newCard.quality.toUpperCase().includes(search);
    });
  $('.search-input').empty();
 for (var i = 0; i < results.length; i++) {
   addCard(results[i]);
  }
}



// if (event.keyCode === 13) {
//   event.preventDefault();
//   this.blur();}



//
// $('.idea-card-parent').empty();
// results.forEach(function(result) {
//   addCard(result)
// });

// EVENT LISTENER FOR SEARCH
$('.save-btn').on('click', function(event){
  event.preventDefault ();
  fireCards ()
})
// $('.idea-card-parent').on('click', '.downvote-btn', downvoteListener)
