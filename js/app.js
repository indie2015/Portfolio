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

//Main Logic
    let counter = 0;
    const mydeck = document.querySelectorAll('.card')  ;
    const myrestart = document.querySelectorAll('.restart')  ;
    let openCards = [];
    const totalMoves = document.getElementsByClassName('moves');
    const numOfmatches = document.getElementsByClassName('match');
    let timer = 0;
    let time = 0;
    let elementStr = '';

    mydeck.forEach(function(card) {

      card.addEventListener('click',function(e) {

       if(counter == 0) {
         setTimer();
       }
       counter += 1;
       totalMoves[0].innerText = counter;

        if(openCards.length < 2) {
          openCards.push(card);

          if(!card.classList.contains('open') &&
             !card.classList.contains('show') &&
             !card.classList.contains('match'))
           {
              card.classList.add('open','show');
           }
        }

        if(openCards.length == 2) {

          //See if we have a match
          let match = cardMatch(openCards);
          if(match === 1) {
             openCards = [];
          }
          else {

            setTimeout(function() {
              if(openCards.length != 0) {
                openCards.forEach( function(card) {
                  card.classList.remove('open','show')
                });
              }
              openCards = [];
            },5000);
          }
        }
        else {
          if(openCards.length < 2) {
            card.classList.add('open','show');
          }
          else {
          setTimeout(function() {
            if(openCards.length != 0) {
              openCards.forEach( function(card) {
                card.classList.remove('open','show')
              });
            }
            openCards = [];
           },5000);
          }
       }

       //Delay to display cards
       setTimeout(function() {
         let resetgame = 0;
         let stars = document.querySelector('.score-panel').firstElementChild;
         let starchild = stars.firstElementChild;
         let laststar = stars.lastElementChild;
         let numofmoves = totalMoves[0].innerText;
         let totalTime = timer;

         if(numOfmatches.length === 16) {
           clearTimer();
           if(numofmoves >= 0 && numofmoves <= 40) {
             if(window.confirm("Congratulations!  Your star rating is 3 Stars.  Would you like to play again?")) {
               resetgame = 1;
             }
           }
           if(numofmoves >= 41 && numofmoves <= 51) {
             stars.removeChild(starchild);
             if(window.confirm("Congratulations!  Your star rating is 2 Stars.  Would you like to play again?")) {
               resetgame = 1;
             }
           }
           if(numofmoves >= 51) {
             stars.removeChild(starchild);
             stars.removeChild(laststar);
             if(window.confirm("Congratulations!  Your star rating is 1 Star.  Would you like to play again?")) {
              resetgame = 1;
             }
           }

           if(resetgame) {
             initGame();
           }
           else {
             mydeck.forEach(function (card) {
               card.classList.remove('open','show','match');
             });
           }
         }
       },10000);


      });    //End of Event Listener

    });     //End of ForEach

//Reset Game function
myrestart.forEach(function(rsitem) {
  rsitem.addEventListener('click',function (e) {
    let mydeck = document.querySelectorAll('.card');
    let rmoves = document.getElementsByClassName('moves');
    let mydeckarr = ['fa-diamond','fa-diamond',
                     'fa-cube','fa-cube',
                     'fa-paper-plane-o','fa-paper-plane-o',
                     'fa-leaf','fa-leaf',
                     'fa-bomb','fa-bomb',
                     'fa-bolt','fa-bolt',
                     'fa-anchor','fa-anchor',
                     'fa-bicycle','fa-bicycle'];
    let mynewdeck = [];
    counter = 0;
    rmoves[0].innerText = 0;
    clearTimer();
    mydeck.forEach(function (card) {
      card.classList.remove('open','show','match');
    });

    mynewdeck = shuffle(mydeckarr);


    //Remove & add the new icon classes
    mydeck.forEach(function (card) {
      let tempcard = $(card).find('i').attr('class');
      let splittempcrd = tempcard.split(" ");
      card.firstElementChild.classList.remove(splittempcrd[0],splittempcrd[1]);
    });

    let i = 0;
    mydeck.forEach(function (card) {
      card.firstElementChild.classList.add('fa',mynewdeck[i]);
      i += 1;
    });

  }); //end of rsitem event listener

});  // End of myrestart foreach


//Function to initialize game
function initGame() {
  let mydeck = document.querySelectorAll('.card');
  let imoves = document.getElementsByClassName('moves');
  counter = 0;
  clearTimer();
  let mydeckarr = ['fa-diamond','fa-diamond',
                   'fa-cube','fa-cube',
                   'fa-paper-plane-o','fa-paper-plane-o',
                   'fa-leaf','fa-leaf',
                   'fa-bomb','fa-bomb',
                   'fa-bolt','fa-bolt',
                   'fa-anchor','fa-anchor',
                   'fa-bicycle','fa-bicycle'];
  let mynewdeck = [];
  imoves[0].innerText = 0;
  mydeck.forEach(function (card) {
    card.classList.remove('open','show','match');
  });

  mynewdeck = shuffle(mydeckarr);


  //Remove & add the new icon classes
  mydeck.forEach(function (card) {
    let tempcard = $(card).find('i').attr('class');
    let splittempcrd = tempcard.split(" ");
    card.firstElementChild.classList.remove(splittempcrd[0],splittempcrd[1]);
  });

  let i = 0;
  mydeck.forEach(function (card) {
    card.firstElementChild.classList.add('fa',mynewdeck[i]);
    i += 1;
  });
}
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

//Function to start timer
function setTimer() {
  let timer = setInterval(function() {
    time += 1;
    if(time > 1) {
      let removetimer = document.querySelector('.score-panel').lastChild;
      removetimer.remove(0);
    }
    let myelement = document.createElement('div');
    let myelementtxt = document.createTextNode(time);
    myelement.appendChild(myelementtxt);
    document.querySelector('.score-panel').appendChild(myelement);
  },1000);

  //return timer;
}

//Clear Timer
function clearTimer() {
  clearInterval(timer);
}

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
