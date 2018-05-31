/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//$(document).ready(function() {

    const mydeck = document.querySelectorAll('.card')  ;
    let openCards = [];

    mydeck.forEach(function(card) {

      card.addEventListener('click',function(e) {

        openCards.push(card);

        if(openCards.length === 2) {

          //See if we have a match
          let match = cardMatch(openCards);
          if(match === 1) {
             openCards = [];
          }
          else {
            card.classList.add('open','show');
            setTimeout(function() {
              openCards.forEach( function (card) {
                card.classList.remove('open','show');
            });},5000);
            //End of Timeout
            setTimeout(function() {
              openCards = [];
            },8000);

          }
        }
        else {
          card.classList.add('open','show');
        }

      });    //End of Event Listener
    });     //End of ForEach

//Function to check for a match
function cardMatch(openCards) {
  let firstCard = $(openCards[0]).find('i').attr('class');
  let secondCard = $(openCards[1]).find('i').attr('class');

  if(firstCard === secondCard) {
     openCards.forEach(function (card) {
      card.classList.add('match','open','show');
    });
    return 1;
  }
  else {
    return 0;
  }
}

function cardShow(card) {
      card.classList.add('open','show');
}  //End of cardShow

function cardClose(openCards) {
  setTimeout(function() {
    openCards.forEach( function (card) {
      card.classList.remove('open','show');
  });},5000);
}  //End of cardClose
/*
    $('.card').on('click', 'li', function(evt) {
      $(this).addClass('open');
      $(this).addClass('show');

    });
*/

//}); //End of document ready function

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
