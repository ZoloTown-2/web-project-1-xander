let startButton;
let scoreField;
let timeField;
let accField;
let rateField;
let target;
let playing = false;
let score = 0;
let time = 30;
let accVal = 0;
let hitCount = 0;
let rateVal = 0;
let rateMinVal = 0;
let accuracy = [];
let rates = [];
let wasHit = false;
document.addEventListener('DOMContentLoaded', () => {
  startButton = document.getElementById('start');
  scoreField = document.getElementById('score');
  timeField = document.getElementById('time');
  rateField = document.getElementById('rate');
  accField = document.getElementById('accuracy');
  target = document.getElementById('target');
});
function random(cap) {
  return Math.floor(Math.random() * (cap + 1));
}
function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}
async function start() {
  startButton.hidden = true;
  scoreField.hidden = false;
  timeField.hidden = false;
  accField.hidden = false;
  rateField.hidden = false;
  score = 0;
  time = 30;
  hitCount = 0;
  accuracy = [];
  rates = [];
  scoreField.innerHTML = 'Score: 0';
  timeField.innerHTML = 'Time left: 30 seconds';
  accField.innerHTML = 'Accuracy: --%';
  rateField.innerHTML = 'Rate: -- hits per minute (-- per second)';
  playing = true;
  for (var i = 0; i < 30; i++) {
    await sleep(1000);
    time--;
    rates.push(hitCount);
    rateVal = 0;
    rateMinVal = 0;
    for (var j = 0; j < rates.length; j++) {
      rateVal += rates[j];
    }
    rateVal /= rates.length;
    rateVal = Math.round(rateVal * 1000) / 1000;
    rateMinVal = rateVal * 60;
    rateMinVal = Math.round(rateMinVal * 1000) / 1000;
    // This is like the other use (below), but it's limited to three decimals instead of two.
    timeField.innerHTML = 'Time left: ' + time + ' seconds';
    rateField.innerHTML = 'Rate: ' + rateMinVal + ' hits per minute (' + rateVal + ' per second)';
    hitCount = 0;
  }
  alert('Your time is up. Click OK to see your results.');
  playing = false;
  startButton.innerHTML = 'Try again';
  startButton.hidden = false;
}
function miss() {
  if (!playing) {return;}
  if (wasHit) {
    wasHit = false;
    return;
  }
  accuracy.push(0);
  accVal = 0;
  for (var i = 0; i < accuracy.length; i++) {
    accVal += accuracy[i];
  }
  accVal /= accuracy.length;
  accVal = Math.round(accVal * 100) / 100;
  accField.innerHTML = 'Accuracy: ' + accVal + '%';
  wasHit = false;
}
function hit() {
  if (!playing) {return;}
  wasHit = true;
  score++;
  hitCount++;
  scoreField.innerHTML = 'Score: ' + score;
  accuracy.push(100);
  accVal = 0;
  for (var i = 0; i < accuracy.length; i++) {
    accVal += accuracy[i];
  }
  accVal /= accuracy.length;
  accVal = Math.round(accVal * 100) / 100;
  // The line above gives the accVal variable a limit of two decimals.
  accField.innerHTML = 'Accuracy: ' + accVal + '%';
  target.style.left = random(250) + 'px';
  target.style.top = random(250) + 'px';
}