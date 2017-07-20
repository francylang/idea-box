var cardArray = []
var cardList = $('.idea-card-parent')

function CardElements(title, body) {
  this.title = title;
  this.body = body;
  this.id = Date.now();
  this.quality = 'Swill';
}

$(window).on('load', function() {
  console.log('working!!!');
  retrieveLocalStorage();
  clearInputs();
})

function addCards(buildCard) {
  $('.idea-card-parent').prepend(
    `<article class="idea-card" id="${buildCard.id}">
      <h2 contenteditable="true">${buildCard.title}</h2>
      <div class="delete-btn" id="delete">
      </div>
      <p class="body-text" contenteditable="true">${buildCard.body}</p>
      <div class="ratings">
      <div class="upvote-btn" id="upvote"></div>
      <div class="downvote-btn" id="downvote"></div>
        <p class="quality">quality: <span class="${buildCard.id}">${buildCard.quality}</span></p>
      </div>
      <hr>
    </article>`);
}

function fireCards() {
  var newCard = new CardElements($('.title-input').val(), $('.body-input').val());
  cardArray.push(newCard)
  addCards(newCard);
  storeCards();
  clearInputs();
}

$('.idea-card-parent').on('click', '#delete', function() {
  var currentCardId = $(this).closest('.idea-card')[0].id
  cardArray.forEach(function(card, index) {
    if (currentCardId == card.id) {
      cardArray.splice(index, 1)
    }
  })
  storeCards()
  $(this).parents('.idea-card').remove()
})

$('.idea-card-parent').on('click', '#upvote', function(event) {
  event.preventDefault();
  var cardId = $(this).closest('.idea-card')[0].id
  cardArray.forEach(function(card) {
    if (card.id == cardId) {
      if (card.quality === "Swill") {
        card.quality = "Plausible";
        $('.' + cardId).text('Plausible')
      } else if (card.quality === "Plausible") {
        card.quality = "Genius"
        $('.' + cardId).text('Genius')
      } else {
        card.quality = "Genius"
        $('.' + cardId).text('Genius')
      }
    }
    storeCards();
  })
});

$('.idea-card-parent').on('click', '#downvote', function (event){
  event.preventDefault();
  var cardId = $(this).closest('.idea-card')[0].id
  console.log(cardId)
  cardArray.forEach(function (card) {
    console.log(cardId)
  if (card.id == cardId) {
    if (card.quality === 'Genius') {
        card.quality = 'Plausible';
        $('.' + cardId).text('Plausible')
      } else if (card.quality === 'Plausible') {
        card.quality = 'Swill'
        $('.' + cardId).text('Swill')
      }else{
        card.quality = 'Swill'
        $('.' + cardId).text('Swill')
      }
  }
  storeCards();
})
});

function storeCards() {
  localStorage.setItem('array', JSON.stringify(cardArray));
  clearInputs()
};

function clearInputs() {
  $('.title-input').val('');
  $('.body-input').val('');
  $('title-input').focus();
}

function retrieveLocalStorage() {
  cardArray = JSON.parse(localStorage.getItem('array')) || [];
  cardArray.forEach(function(card) {
    addCards(card);
  })
}

$('.save-btn').on('click', function(event) {
  event.preventDefault();
  fireCards()
})

cardList.on('keyup', 'h2', function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    this.blur();
  }
  var id = $(this).closest('.idea-card')[0].id;
  var title = $(this).text();
  cardArray.forEach(function(card) {
    if (card.id == id) {
      card.title = title;
    }
  })
  storeCards();
})

cardList.on('keyup', '.body-text', function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    this.blur();
  }
  var id = $(this).closest('.idea-card')[0].id;
  var body = $(this).text();
  cardArray.forEach(function(card) {
    if (card.id == id) {
      card.body = body;
    }
  })
  storeCards();
})

$('.search-input').on('keyup', searchCards)
function searchCards() {
  var search = $(this).val().toUpperCase();
  var results = cardArray.filter(function(elementCard) {
    return elementCard.title.toUpperCase().includes(search) ||
           elementCard.body.toUpperCase().includes(search) ||
           elementCard.quality.toUpperCase().includes(search);
  });
  $('.idea-card-parent').empty();
  for (var i = 0; i < results.length; i++) {
    addCards(results[i]);
  }
}
