function addCards() {
  var titleInput = document.querySelector(".title-input").value
  var bodyInput = document.querySelector(".body-input").value
  $('.idea-card-parent').prepend(`<article class="idea-card">
    <h2>${titleInput}</h2>
    <input class="delete-btn" type="image" src="FEE-ideabox-icon-assets/delete.svg" />
    <p class="body-text">${bodyInput}</p>
    <div class="ratings">
    <input class="upvote-btn" type="image" src="FEE-ideabox-icon-assets/upvote.svg" />
    <input class="downvote-btn" type="image" src="FEE-ideabox-icon-assets/downvote.svg" />
    <p class="quality">quality:<span class="qualityRating">swill</span></p>
    <hr>
    </div>
    </article>`)
}

function fireCards (event) {
  event.preventDefault ()
  addCards()
}

function upVote() {
  var spanText = $('.qualityRating').text();
  if (spanText === 'swill') {
  $('.qualityRating').text('plausible')
} else if (spanText === 'plausible') {
  $('.qualityRating').text('genius')
} else {
  $('.qualityRating').text('genius')
 }
}

function downVote() {
  var spanText = $('.qualityRating').text();
  if (spanText === 'swill') {
  $('.qualityRating').text('swill')
} else if (spanText === 'plausible') {
  $('.qualityRating').text('swill')
} else if (spanText === 'genius') {
  $('.qualityRating').text('plausible')
} else {
  $('.qualityRating').text('swill')
 }
}


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
