'use strict';

var scoreboard = (function () {

  var board = [],
      obs = [];

  function ScoreCard (player) {
    this.nickname = player.nickname;
    this.score = player.score;
  }

  function notify (observers, score) {
    observers.forEach(function(observer) {
      observer.update(score);
    });
  }
  function addCard (player) {
    board.push(new ScoreCard(player));
  }

  return {
    update: function (players) {
      board = [];
      players.forEach(function(player) {
        addCard(player);
      });
      notify(obs, board);
    },
    render: function () {
      return board;
    },
    attach: function () {
      for (var prop in arguments) {
        obs.push(arguments[prop]);
      }
    }
  };

})();
//
