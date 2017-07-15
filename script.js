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
    <p class="quality">quality:<span>swill</span></p>
    <hr>
    </div>
    </article>`)
}

function fireCards (event) {
  event.preventDefault ()
  addCards()
}

function deleteCard() {
 $(this).parents('.idea-card').remove()
}


$('.save-btn').on('click', fireCards)
$('.idea-card-parent').on('click', '.delete-btn', deleteCard)
