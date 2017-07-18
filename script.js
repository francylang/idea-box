function CardElements(title, body) {
  this.title = title;
  this.body = body;
  this.id = Date.now();
  this.quality = 'Swill';
}

// create empty array []
var cardArray = []

function addCards (card) {
  $('.idea-card-parent').prepend(
  `<article class="idea-card" id="${this.id}">
      <h2>${this.title}</h2>
        <input class="delete-btn" type="image" src="FEE-ideabox-icon-assets/delete.svg" />
        <p class="body-text">${this.body}</p>
    <div class="ratings">
      <input class="upvote-btn" type="image" src="FEE-ideabox-icon-assets/upvote.svg" />
      <input class="downvote-btn" type="image" src="FEE-ideabox-icon-assets/downvote.svg" />
      <p class="quality">quality:<span class="qualityRating">swill</span></p>
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
  console.log(newCard);
  cardArray.push(newCard)
  addCards(newCard);
  console.log(cardArray);
  storeCards();
}


function upVote() {
  var currentQuality = this.quality;
  if (currentQuality === 'swill') {
  $('.qualityRating').text('plausible')
} else if (currentQuality === 'plausible') {
  $('.qualityRating').text('genius')
} else {
  $('.qualityRating').text('genius')
 }
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


function upvoteListener(event) {
  event.preventDefault ()
  $(this).parents('.idea-card')
  upVote()
}

function downvoteListener(event) {
  event.preventDefault ()
  $(this).parents('.idea-card')
  downVote()
}

function deleteCard() {
 $(this).parents('.idea-card').remove()
}


$('.save-btn').on('click', fireCards)
$('.idea-card-parent').on('click', '.delete-btn', deleteCard)
$('.idea-card-parent').on('click', '.upvote-btn', upvoteListener)
$('.idea-card-parent').on('click', '.downvote-btn', downvoteListener)
