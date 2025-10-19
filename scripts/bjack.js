// Feel free to ask me how any of this works.
// I did not use any AI for this. This took me a very, very long time.
// As any programmer would, I did a lot of googling to reach this point.
const suits = {
  CLUBS: 'Clubs',
  DIAMONDS: 'Diamonds',
  SPADES: 'Spades',
  HEARTS: 'Hearts'
};
const decks = {
  COMPUTER: 'Computer',
  USER: 'User',
  SPLIT: 'Split'
};
class Card {
  val = 1;
  suit = 'Clubs';
  faceUp = true;
  constructor(val, suit, faceUp) {
    this.val = val;
    this.suit = suit;
    this.faceUp = faceUp;
  }
}
let initDeck = [];
let deck = [];
let deckCount = 0;
let comdeck = [];
let cdid = [];
let plydeck = [];
let pdid = [];
let psdeck = [];
let psdid = [];
let comlegend;
let plylegend;
let pslegend;
let comcards;
let plycards;
let plysplit;
let pscards;
let ended = false;
let doubled = false;
let inSplit = false;
let splitting = false;
let comCardTotal = 0;
let plyCardTotal = 0;
let psCardTotal = 0;
let comStaying = false;
let plyStaying = false;
let psStaying = false;
let comDoubled = false;
let plyDoubled = false;
let psDoubled = false;
let barback;
let barfront;
let bet = 10;
let score = 0;
let count = 0;
let comwins = 0;
let plywins = 0;
let buButton;
let bdButton;
let narrator;
let betDisplay;
let scoreDisplay;
let countDisplay;
let winsDisplay;
let dealButton;
let hitButton;
let stayButton;
let doubleButton;
let splitButton;
let playing = false;
let ident = 0;
let turn = 1;
let turnType = decks.COMPUTER; // For debugging only
for (var i = 0; i < 52; i++) {
  var val = (i % 13) + 1;
  var suitNum = Math.floor(i / 13) + 1;
  var suit;
  switch (suitNum) {
    case 1: {
      suit = 'Clubs';
      break;
    }
    case 2: {
      suit = 'Diamonds';
      break;
    }
    case 3: {
      suit = 'Spades';
      break;
    }
    case 4: {
      suit = 'Hearts';
      break;
    }
    default: {
      console.error('Error reading number: ' + suitNum);
      suit = 'Clubs';
      break;
    }
  }
  initDeck.push(new Card(val, suit, false));
}
document.addEventListener('DOMContentLoaded', () => {
  comlegend = document.getElementById('comlegend');
  plylegend = document.getElementById('plylegend');
  pslegend = document.getElementById('pslegend');
  comcards = document.getElementById('comcards');
  plycards = document.getElementById('plycards');
  plysplit = document.getElementById('plysplit');
  pscards = document.getElementById('pscards');
  barback = document.getElementById('barback');
  barfront = document.getElementById('barfront');
  buButton = document.getElementById('betup');
  bdButton = document.getElementById('betdown');
  narrator = document.getElementById('narrator');
  betDisplay = document.getElementById('bet');
  scoreDisplay = document.getElementById('score');
  countDisplay = document.getElementById('count');
  winsDisplay = document.getElementById('wins');
  dealButton = document.getElementById('deal');
  hitButton = document.getElementById('hit');
  stayButton = document.getElementById('stay');
  doubleButton = document.getElementById('double');
  splitButton = document.getElementById('split');
});
function betup() {
  if (bet >= 100) {return;}
  bet += 10;
  betDisplay.innerHTML = 'Bet: ' + bet + ' points';
}
function betdown() {
  if (bet <= 10) {return;}
  bet -= 10;
  betDisplay.innerHTML = 'Bet: ' + bet + ' points';
}
function createCard(card, forPlayer, id) {
  var val;
  var suit = card.suit;
  var faceUp = card.faceUp;
  var color = faceUp ? ((suit == suits.CLUBS || suit == suits.SPADES) ? 'blackcard' : 'redcard') : 'downcard';
  var element = document.createElement('div');
  element.classList.add(color);
  switch (card.val) {
    case 1: {
      val = 'A';
      break;
    }
    case 11: {
      val = 'J';
      card.val = 10;
      break;
    }
    case 12: {
      val = 'Q';
      card.val = 10;
      break;
    }
    case 13: {
      val = 'K';
      card.val = 10;
      break;
    }
    default: {
      val = card.val;
      break;
    }
  }
  var suitEnt = '&clubs;';
  switch (suit) {
    case 'Clubs': {
      suitEnt = '&clubs;';
      break;
    }
    case 'Diamonds': {
      suitEnt = '&diams;';
      break;
    }
    case 'Spades': {
      suitEnt = '&spades;';
      break;
    }
    case 'Hearts': {
      suitEnt = '&hearts;';
      break;
    }
  }
  element.id = id;
  if (forPlayer == decks.USER) {
    document.getElementById('plycards').appendChild(element);
    plydeck.push(card);
    pdid.push(id);
  } else if(forPlayer == decks.SPLIT) {
    document.getElementById('pscards').appendChild(element);
    psdeck.push(card);
    psdid.push(id);
  } else {
    document.getElementById('comcards').appendChild(element);
    comdeck.push(card);
    cdid.push(id);
  }
  if (faceUp) {
    var hicard = document.createElement('aside');
    var midcard = document.createElement('label');
    var lowcard = document.createElement('aside');
    var hilabel = document.createElement('label');
    var lowlabel = document.createElement('label');
    hicard.classList.add('hicard');
    midcard.classList.add('midcard');
    lowcard.classList.add('lowcard');
    midcard.innerHTML = val;
    hilabel.innerHTML = suitEnt;
    lowlabel.innerHTML = suitEnt;
    midcard.classList.add('cardlabel');
    hilabel.classList.add('cardlabel');
    lowlabel.classList.add('cardlabel');
    element.appendChild(hicard);
    element.appendChild(midcard);
    element.appendChild(lowcard);
    hicard.appendChild(hilabel);
    lowcard.appendChild(lowlabel);
  } else {
    var dcback = document.createElement('div');
    var dcbcircle = document.createElement('div');
    var dcbcc = document.createElement('div');
    dcback.classList.add('dcback');
    dcbcircle.classList.add('dcbcircle');
    dcbcc.classList.add('dcbcc');
    element.appendChild(dcback);
    dcback.appendChild(dcbcircle);
    dcbcircle.appendChild(dcbcc);
  }
  calculateCards();
}
function flipCard(id) {
  var element = document.getElementById(id);
  var faceUp = !element.classList.contains('downcard');
  var deck = element.parentElement.id;
  var card;
  if (deck == 'comcards') {
    card = comdeck[cdid.indexOf(id)];
  } else if (deck == 'plycards') {
    card = plydeck[pdid.indexOf(id)];
  } else {
    card = psdeck[psdid.indexOf(id)];
  }
  var val;
  switch (card.val) {
    case 1: {
      val = 'A';
      break;
    }
    case 11: {
      val = 'J';
      card.val = 10;
      break;
    }
    case 12: {
      val = 'Q';
      card.val = 10;
      break;
    }
    case 13: {
      val = 'K';
      card.val = 10;
      break;
    }
    default: {
      val = card.val;
      break;
    }
  }
  var suitEnt = '&clubs;';
  switch (card.suit) {
    case 'Clubs': {
      suitEnt = '&clubs;';
      break;
    }
    case 'Diamonds': {
      suitEnt = '&diams;';
      break;
    }
    case 'Spades': {
      suitEnt = '&spades;';
      break;
    }
    case 'Hearts': {
      suitEnt = '&hearts;';
      break;
    }
  }
  if (faceUp) {
    for (var i = element.children.length - 1; i >= 0; i--) {
      element.children.item(i).remove();
    }
    if (card.suit == suits.CLUBS || card.suit == suits.SPADES) {
      element.classList.replace('blackcard', 'downcard');
    } else {
      element.classList.replace('redcard', 'downcard');
    }
    var dcback = document.createElement('div');
    var dcbcircle = document.createElement('div');
    var dcbcc = document.createElement('div');
    dcback.classList.add('dcback');
    dcbcircle.classList.add('dcbcircle');
    dcbcc.classList.add('dcbcc');
    element.appendChild(dcback);
    dcback.appendChild(dcbcircle);
    dcbcircle.appendChild(dcbcc);
  } else {
    for (var i = element.children.length - 1; i >= 0; i--) {
      element.children.item(i).remove();
    }
    if (card.suit == suits.CLUBS || card.suit == suits.SPADES) {
      element.classList.replace('downcard', 'blackcard');
    } else {
      element.classList.replace('downcard', 'redcard');
    }
    var hicard = document.createElement('aside');
    var midcard = document.createElement('label');
    var lowcard = document.createElement('aside');
    var hilabel = document.createElement('label');
    var lowlabel = document.createElement('label');
    hicard.classList.add('hicard');
    midcard.classList.add('midcard');
    lowcard.classList.add('lowcard');
    midcard.innerHTML = val;
    hilabel.innerHTML = suitEnt;
    lowlabel.innerHTML = suitEnt;
    element.appendChild(hicard);
    element.appendChild(midcard);
    element.appendChild(lowcard);
    hicard.appendChild(hilabel);
    lowcard.appendChild(lowlabel);
  }
}
function removeCard(id) {
  var element = document.getElementById(id);
  element.remove();
  var card;
  var tdeck = decks.COMPUTER;
  for (var i = 0; i < comdeck.length; i++) {
    if (cdid[i] == id) {
      card = comdeck[i];
      tdeck = decks.COMPUTER;
    }
  }
  for (var i = 0; i < plydeck.length; i++) {
    if (pdid[i] == id) {
      card = plydeck[i];
      tdeck = decks.USER;
    }
  }
  for (var i = 0; i < psdeck.length; i++) {
    if (psdid[i] == id) {
      card = psdeck[i];
      tdeck = decks.SPLIT;
    }
  }
  if (!!card) {
    switch (tdeck) {
      case decks.COMPUTER: {
        comdeck.splice(comdeck.indexOf(card), 1);
        break;
      }
      case decks.USER: {
        plydeck.splice(plydeck.indexOf(card), 1);
        break;
      }
      case decks.SPLIT: {
        psdeck.splice(psdeck.indexOf(card), 1)
        break;
      }
      default: {
        console.error('Couldn\'t get proper deck value: ' + tdeck);
        break;
      }
    }
  }
}
function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function shuffle() {
  var tempDeck = [...deck];
  var length = deck.length;
  // length's use is required in the for loop, because
  // if we use 'tempDeck.length' instead, the length
  // will update each loop to the elements being
  // spliced out. This halves the deck.
  deck = [];
  for (var i = 0; i < length; i++) {
    var selected = random(0, tempDeck.length);
    deck.push(tempDeck[selected]);
    tempDeck.splice(selected, 1);
  }
}
async function calculateCards() {
  var subtotal = 0;
  var aces = 0;
  var total = 0;
  comCardTotal = 0;
  for (var i = 0; i < comdeck.length; i++) {
    if (comdeck[i].val == 1) {
      aces++;
    } else {
      subtotal += comdeck[i].val;
    }
  }
  total = subtotal;
  if (aces > 0) {
    for (var i = aces; i >= 0; i--) {
      var elevens = i * 11;
      var ones = aces - i;
      total = subtotal + elevens + ones;
      if (total <= 21) {break;}
    }
  }
  comCardTotal = total;
  if (comdeck.length >= 5 && total <= 21 && !ended) {
    endgame();
  }
  subtotal = 0;
  aces = 0;
  total = 0;
  plyCardTotal = 0;
  for (var i = 0; i < plydeck.length; i++) {
    if (plydeck[i].val == 1) {
      aces++;
    } else {
      subtotal += plydeck[i].val;
    }
  }
  total = subtotal;
  if (aces > 0) {
    for (var i = aces; i >= 0; i--) {
      var elevens = i * 11;
      var ones = aces - i;
      total = subtotal + elevens + ones;
      if (total <= 21) {break;}
    }
  }
  if (plycards.length >= 5 && total <= 21 && !ended) {
    endgame();
  }
  plyCardTotal = total;
  if (plyCardTotal >= 21) {
    if (plyCardTotal > 21) {
      plylegend.innerHTML = 'Player (missed)';
    } else if (plyCardTotal == 21 && turn == 1) {
      plylegend.innerHTML = 'Player (natural!)';
    } else {
      plylegend.innerHTML = 'Player (perfect!)';
    }
    plyStaying = true;
  }
  subtotal = 0;
  aces = 0;
  total = 0;
  psCardTotal = 0;
  for (var i = 0; i < psdeck.length; i++) {
    if (psdeck[i].val == 1) {
      aces++;
    } else {
      subtotal += psdeck[i].val;
    }
  }
  total = subtotal;
  if (aces > 0) {
    for (var i = aces; i >= 0; i--) {
      var elevens = i * 11;
      var ones = aces - i;
      total = subtotal + elevens + ones;
      if (total <= 21) {break;}
    }
  }
  if (pscards.length >= 5 && total <= 21 && !ended) {
    endgame();
  }
  psCardTotal = total;
  if (psCardTotal >= 21) {
    if (psCardTotal > 21) {
      pslegend.innerHTML = 'Player\'s Split (missed)';
    } else if (psCardTotal == 21 && turn == 1) {
      pslegend.innerHTML = 'Player\'s Split (natural!)';
    } else {
      pslegend.innerHTML = 'Player\'s Split (perfect!)';
    }
    psStaying = true;
  }
}
async function getCardTotal(tdeck) {
  await calculateCards();
  switch (tdeck) {
    case decks.USER: {return plyCardTotal;}
    case decks.COMPUTER: {return comCardTotal;}
    case decks.SPLIT: {return psCardTotal;}
    default: {console.error('Error reading deck: ' + tdeck);}
  }
}
function pickDeck(faceUp) {
  if (deck.length > 0) {
    var card = deck[0];
    card.faceUp = faceUp;
    deck.shift();
    ident++;
    barfront.style.width = ((deck.length / (deckCount * 52)) * 100) + '%';
    switch (card.val) {
      case 2:
      case 3:
      case 4:
      case 5:
      case 6: {
        count++;
        break;
      }
      case 1:
      case 10:
      case 11:
      case 12:
      case 13: {
        count--;
        break;
      }
    }
    countDisplay.innerHTML = 'Count: ' + count;
    return card;
  } else {
    alert('Notice: All decks have been used. The decks will now be refreshed.');
    for (var i = 0; i < deckCount; i++) {
      deck.push(...initDeck);
    }
    shuffle();
    count = 0;
    return pickDeck(faceUp);
  }
}
function checkForSplit(forPlayer) {
  if (forPlayer == decks.USER) {
    return plydeck[0].val == plydeck[1].val;
  } else {
    return comdeck[0].val == comdeck[1].val;
  }
}
function deal() {
  if (playing) {
    ident = 0;
    for (var i = comcards.children.length - 1; i >= 0; i--) {
      comcards.children.item(i).remove();
    }
    for (var i = plycards.children.length - 1; i >= 0; i--) {
      plycards.children.item(i).remove();
    }
    for (var i = pscards.children.length - 1; i >= 0; i--) {
      pscards.children.item(i).remove();
    }
    comdeck = [];
    cdid = [];
    plydeck = [];
    pdid = [];
    psdeck = [];
    psdid = [];
    // Laid out as a dealer typically would -- one card to the guest, one card to the host, one card to the guest, and so on.
    createCard(pickDeck(true), decks.USER, 'Card' + ident);
    createCard(pickDeck(false), decks.COMPUTER, 'Card' + ident);
    createCard(pickDeck(true), decks.USER, 'Card' + ident);
    createCard(pickDeck(true), decks.COMPUTER, 'Card' + ident);
    betDisplay.innerHTML = 'Bet: ' + bet + ' points';
    comlegend.innerHTML = 'Dealer';
    plylegend.innerHTML = 'Player';
    pslegend.innerHTML = 'Player\'s Split';
    ended = false;
    dealButton.disabled = true;
    buButton.disabled = true;
    bdButton.disabled = true;
    hitButton.disabled = false;
    stayButton.disabled = false;
    doubleButton.disabled = false;
    splitButton.disabled = false;
    comCardTotal = 0;
    plyCardTotal = 0;
    comStaying = false;
    plyStaying = false;
    psStaying = false;
    comDoubled = false;
    plyDoubled = false;
    psDoubled = false;
    splitting = false;
    inSplit = false;
    plysplit.hidden = true;
    turn = 1;
    if (!checkForSplit(decks.USER)) {
      splitButton.disabled = true;
    }
    turnType = 'User';
    narrator.innerHTML = 'Ongoing game...';
  } else {
    if (deckCount <= 0) {
      while (true) {
        var input = prompt('Please enter the amount of decks you would like to play with. (Recommended: 4, Max: 10)');
        deckCount = Math.floor(input);
        if (Number.isNaN(deckCount) || deckCount <= 0 || deckCount > 10) {continue;}
        break;
      }
    }
    for (var i = 0; i < deckCount; i++) {
      deck.push(...initDeck);
    }
    shuffle();
    playing = true;
    deal();
  }
}
async function hit() {
  if (inSplit) {
    createCard(pickDeck(true), decks.SPLIT, 'Card' + ident);
  } else {
    createCard(pickDeck(true), decks.USER, 'Card' + ident);
  }
  if (await getCardTotal(decks.USER) >= 21) {
    plyStaying = true;
    plylegend.innerHTML = 'Player (missed)';
  }
  comturn();
}
function stay() {
  if (inSplit) {
    psStaying = true;
    pslegend.innerHTML = 'Player\'s Split (staying)';
  } else {
    plyStaying = true;
    plylegend.innerHTML = 'Player (staying)';
  }
  comturn();
}
function double() {
  doubled = true;
  bet *= 2;
  betDisplay.innerHTML = 'Bet: ' + (bet / 2) + ' (&times;2) points';
  if (inSplit) {
    psStaying = true;
  } else {
    plyStaying = true;
  }
  hit();
}
function split() {
  plysplit.hidden = false;
  var moveCard = plydeck[1];
  var val = document.getElementById('Card3').getElementsByClassName('midcard').item(0).innerHTML;
  switch (val) {
    case 'A': {
      val = 1;
    }
    case 'J': {
      val = 11;
    }
    case 'Q': {
      val = 12;
    }
    case 'K': {
      val = 13;
    }
  }
  moveCard.val = Math.floor(val);
  removeCard('Card3');
  createCard(moveCard, decks.SPLIT, 'Card3');
  createCard(pickDeck(true), decks.USER, 'Card' + ident);
  createCard(pickDeck(true), decks.SPLIT, 'Card' + ident);
  splitting = true;
  inSplit = false;
  splitButton.disabled = true;
  plycards.style.backgroundColor = 'goldenrod';
  plycards.style.border = '5px solid goldenrod';
  calculateCards();
  plyturn();
}
function plyturn() {
  turnType = decks.USER;
  inSplit = false;
  if (plyStaying) {
    comturn();
    return;
  }
  if (splitting) {
    pscards.style.backgroundColor = 'green';
    pscards.style.border = '0px solid goldenrod';
    plycards.style.backgroundColor = 'goldenrod';
    plycards.style.border = '5px solid goldenrod';
  }
  hitButton.disabled = false;
  stayButton.disabled = false;
  doubleButton.disabled = false;
  splitButton.disabled = true;
  turn++;
}
async function comturn() {
  turnType = decks.COMPUTER;
  if (splitting && !inSplit) {
    inSplit = true;
    splitturn();
    return;
  } else if (splitting) {
    pscards.style.backgroundColor = 'green';
    pscards.style.border = '0px solid goldenrod';
    plycards.style.backgroundColor = 'green';
    plycards.style.border = '0px solid green';
  }
  if (comStaying) {
    if (plyStaying && comStaying && ((splitting && psStaying) || (!splitting))) {endgame();}
    return;
  }
  turn++;
  if (await getCardTotal(decks.COMPUTER) > 16) {
    comStaying = true;
    comlegend.innerHTML = 'Dealer (staying)';
  } else {
    createCard(pickDeck(true), decks.COMPUTER, 'Card' + ident);
  }
  if (plyStaying && comStaying && ((splitting && psStaying) || (!splitting))) {endgame();} else {plyturn();}
}
function splitturn() {
  turnType = decks.SPLIT;
  if (psStaying) {
    comturn();
    return;
  }
  pscards.style.backgroundColor = 'goldenrod';
  pscards.style.border = '5px solid goldenrod';
  plycards.style.backgroundColor = 'green';
  plycards.style.border = '0px solid green';
  inSplit = true;
  turn++;
}
async function endgame() {
  ended = true;
  flipCard('Card2');
  hitButton.disabled = true;
  stayButton.disabled = true;
  doubleButton.disabled = true;
  splitButton.disabled = true;
  dealButton.disabled = false;
  buButton.disabled = false;
  bdButton.disabled = false;
  if (await getCardTotal(decks.COMPUTER) >= 21) {
    if (comCardTotal > 21) {
      comlegend.innerHTML = 'Dealer (missed)';
    } else {
      comlegend.innerHTML = 'Dealer (perfect!)';
    }
  }
  // Check if split deck did better or not
  // Check which deck did better
  // Score accordingly (bet and win)
  var plyWinning;
  calculateCards(); // So we don't need to use await getCardTotal(); all the time
  if (splitting) {
    plyWinning = plyCardTotal > psCardTotal ? plyCardTotal : psCardTotal;
  } else {
    plyWinning = plyCardTotal;
  }
  if (plyWinning > 21) {plyWinning = 0;}
  if (comCardTotal > 21) {comCardTotal = 0;}
  console.log('PlyWinning: ' + plyWinning);
  console.log('ComWinning: ' + comCardTotal);
  if (plyWinning > comCardTotal) {
    score += bet;
    plywins++;
    narrator.innerHTML = 'Player won. (+' + bet + ' points)';
  } else if (comCardTotal > plyWinning) {
    score -= bet;
    comwins++;
    narrator.innerHTML = 'Dealer won. (-' + bet + ' points)';
  } else {
    narrator.innerHTML = 'Tie.';
  }
  scoreDisplay.innerHTML = 'Score: ' + score + ' points';
  winsDisplay.innerHTML = 'Wins: ' + plywins + ' - ' + comwins;
  if (doubled) {
    doubled = false;
    bet /= 2;
  }
}