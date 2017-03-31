'use strict';

window.onload = function () {

  var playerForm = document.querySelectorAll('form')[0],
      nameField = document.querySelectorAll('input')[0],
      tauntField = document.querySelectorAll('input')[1],
      scoreView = document.querySelectorAll('div')[0];

  scoreView.update = function (scores) {
    var _this = this;
    this.innerHTML = null;
    scores.forEach(function(player) {
      var scoreCard = document.createElement('div');
      _this.appendChild(scoreCard);
      scoreCard.innerText = `${player.nickname}: ${player.score}`;
    });
  };

  nameField.update = function (scores) {
    this.placeholder = `Player ${players.countHeads() + 1}`;
    this.value = null;
    tauntField.value = null;
    this.focus();
  }

  players.attach(scoreboard);
  scoreboard.attach(scoreView, nameField);

  playerForm.addEventListener('submit', function (ev) {
    ev.preventDefault();
    players.addPlayer(nameField.value, tauntField.value);
  });

};
//
