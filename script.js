var cardArray = []
var cardList = $('.idea-card-parent')


$('.search-input').on('keyup', searchCards)
$('.title-input, .body-input').on('keyup', enableSave)
$('.idea-card-parent').on('click', '#delete', deleteIdeaCard)
$('.idea-card-parent').on('click', '#upvote', upVoteIdea)
$('.idea-card-parent').on('click', '#downvote', downVoteIdea)
$('.save-btn').on('click', preventDefault)
$('.idea-card-parent').on('keyup', 'h2', editIdeaTitle);
cardList.on('keyup', '.body-text', editIdeaBody)



$(document).ready(function() {
  retrieveLocalStorage();
  clearInputs();
});

function CardElement(title, body) {
  this.title = title;
  this.body = body;
  this.id = Date.now();
  this.quality = 'swill';
};


function enterKeyBlur(e) {
  if (e.which === 13) {
    $(e.target).blur();
  };
};

function enableSave() {
  if (($('.title-input').val() !== "") || ($('.body-input').val() !== "")) {
    $('.save-btn').removeAttr('disabled');
  }
};

function deleteIdeaCard() {
  var currentCardId = $(this).closest('.idea-card')[0].id
  cardArray.forEach(function(card, index) {
    if (currentCardId == card.id) {
      cardArray.splice(index, 1)
    }
  })
  storeCards()
  $(this).parents('.idea-card').remove()
};


function upVoteIdea(event) {
  event.preventDefault();
  var cardId = $(this).closest('.idea-card')[0].id
  cardArray.forEach(function(card) {
    if (card.id == cardId) {
      if (card.quality === "swill") {
        card.quality = "plausible";
        $('.' + cardId).text('plausible')
      } else if (card.quality === "plausible") {
        card.quality = "genius"
        $('.' + cardId).text('genius')
      } else {
        card.quality = "genius"
        $('.' + cardId).text('genius')
      }
    }
    storeCards();
  })
};


function downVoteIdea(event){
  event.preventDefault();
  var cardId = $(this).closest('.idea-card')[0].id
  cardArray.forEach(function (card) {
  if (card.id == cardId) {
    if (card.quality === 'genius') {
        card.quality = 'plausible';
        $('.' + cardId).text('plausible')
      } else if (card.quality === 'plausible') {
        card.quality = 'swill'
        $('.' + cardId).text('swill')
      }else{
        card.quality = 'swill'
        $('.' + cardId).text('swill')
      }
  }
  storeCards();
})
};

// this function needs help
function preventDefault(event) {
  event.preventDefault();
  fireCards();
  $('.save-btn').attr('disabled', 'disabled');
};

function editIdeaTitle() {
  var id = $(this).closest('.idea-card')[0].id;
  var title = $(this).text();
  enterKeyBlur(event);
  cardArray.forEach(function(card) {
    if (card.id == id) {
      card.title = title;
    }
  })
  storeCards()
}

function editIdeaBody(event) {
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
};


function searchCards() {
  var search = $(this).val().toUpperCase();
  var results = cardArray.filter(function(elementCard) {
    return elementCard.title.toUpperCase().includes(search) ||
           elementCard.body.toUpperCase().includes(search) ||
           elementCard.quality.toUpperCase().includes(search);
  });
  $('.idea-card-parent').empty();
  for (var i = 0; i < results.length; i++) {
    addCard(results[i]);
  }
};

function addCard(buildCard) {
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
};

function fireCards() {
  var newCard = new CardElement($('.title-input').val(), $('.body-input').val());
  cardArray.push(newCard)
  addCard(newCard);
  storeCards();
  clearInputs();
};

function storeCards() {
  localStorage.setItem('array', JSON.stringify(cardArray));
  clearInputs()
};

function clearInputs() {
  $('.title-input').val('');
  $('.body-input').val('');
  $('title-input').focus();
};

function retrieveLocalStorage() {
  cardArray = JSON.parse(localStorage.getItem('array')) || [];
  cardArray.forEach(function(card) {
    addCard(card);
  })
};
