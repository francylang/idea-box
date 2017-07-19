function CardElements(title, body) {
  this.title = title;
  this.body = body;
  this.id = Date.now();
  this.quality = 'Swill';
}


$(window).on('load', function(){
  retrieveLocalStorage();
  clearInputs();
})

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


function fireCards (event) {
  event.preventDefault ();
  var newCard = new CardElements ($('.title-input').val(), $('.body-input').val());
  console.log(newCard);
  cardArray.push(newCard)
  addCards(newCard);
  console.log(cardArray);
  storeCards();
}

// climb and find id
// pull the quality value from the index that that value lives on in the array
function upVote(userRating) {
  var newArticle = document.createElement('article')
  var currentQuality = userRating.closest(newArticle).id;
  var newQuality;
  cardArray.forEach(function (card) {
  if (card.id == currentQuality) {
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
};

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
  var CardId = $(this).closest('.idea-card')[0].id
  cardArray.forEach(function (card, index) {
    if (cardId == card.id) {
      cardArray.splice(index, 1)
    }
  })
  storeCards()
  $(this).parents('.idea-card').remove()
});


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
  localStorage.setItem('array', JSON.stringify(cardArray));
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
  cardArray = JSON.parse(localStorage.getItem('array')) ;
  cardArray.forEach(function(card) {
    fireCards(card);
  })
}


  // function updateLocalStorage() {
  //   var stringifiedArray = JSON.stringify(cardArray);
  //   localStorage.setItem('array', stringifiedArray);
  // };


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
$('.save-btn').on('click', fireCards)
$('.idea-card-parent').on('click', '.downvote-btn', downvoteListener)
