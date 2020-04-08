export var sortByDate = function (gameA, gameB) { return gameA.time.getTime() - gameB.time.getTime(); };
export var filterPlayingTeam = function (team) { return function (game) { return !team || game.teamA === team.id || game.teamB === team.id; }; };
export var filterConcernedTeam = function (team) { return function (game) { return filterPlayingTeam(team)(game) || game.referee === team.id; }; };
//# sourceMappingURL=GameUtils.js.map