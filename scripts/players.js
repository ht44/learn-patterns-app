'use strict'

var players = (function () {

  var headCount = 0,
      roll = [],
      obs = [];

  function Player(nickname, taunt) {
    this.nickname = nickname;
    this.number = headCount;
    this.score = 0;
    this.taunt = taunt;
  };
  Player.prototype.changeName = function (newName) {
    this.nickname = newName;
    notify(obs, roll);
  };

  function notify (observers, playerState) {
    observers.forEach(function(observer) {
      observer.update(playerState);
    });
  }

  return {
    countHeads: function () {
      return headCount;
    },
    addPlayer: function (nickname, taunt) {
      headCount++;
      roll.push(new Player(nickname, taunt));
      notify(obs, roll);
    },
    removePlayer: function (callSign) {
      if (!headCount) {return;}
      --headCount;
      var targetPlayer = this.getPlayer(callSign);
      roll.forEach(function(player) {
        if (player === targetPlayer) {
          roll.splice(player.number - 1, 1);
        }
      });
      for (let i = 1; i <= headCount; i++) {
        roll[i - 1].number =  i;
      }
      notify(obs, roll);
    },
    getPlayer: function (callSign) {
      var targetPlayer;
      if (typeof callSign == 'number') {
        var index = callSign - 1;
        targetPlayer = roll[index];
      } else {
        roll.forEach(function(player) {
          if (player.nickname === callSign) {
            targetPlayer = player;
          }
        });
      }
      return targetPlayer;
    },
    getPlayers: function () {
      return roll;
    },
    setScore: function (callSign, newScore) {
      var player = this.getPlayer(callSign);
      player.score = newScore;
      notify(obs, roll);
    },
    setScores: function () {
      for (let i = 0; i < arguments.length; i++) {
        if (roll[i] && arguments[i] !== null) {
          roll[i].score = arguments[i];
        }
      }
      notify(obs, roll);
    },
    attach: function () {
      for (var prop in arguments) {
        obs.push(arguments[prop]);
      }
    }
  };

})();
//
