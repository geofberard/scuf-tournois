var GameIssue;
(function (GameIssue) {
    GameIssue[GameIssue["VICTORY"] = 3] = "VICTORY";
    GameIssue[GameIssue["DEFEAT"] = 1] = "DEFEAT";
    GameIssue[GameIssue["DRAWN"] = 0] = "DRAWN";
})(GameIssue || (GameIssue = {}));
var initialStats = {
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    score: 0,
    pointsFor: 0,
    pointsAgainst: 0,
    pointsDiff: 0,
};
export var getWinner = function (game) {
    if (game.scoreA === game.scoreB) {
        return undefined;
    }
    return game.scoreA > game.scoreB ? game.teamA : game.teamB;
};
var getResult = function (team, game) {
    var winner = getWinner(game);
    return winner
        ? winner === team.id ? GameIssue.VICTORY : GameIssue.DEFEAT
        : GameIssue.DRAWN;
};
export var computeStats = function (team, games) {
    return games.filter(function (game) { return game.teamA === team.id || game.teamB === team.id; })
        .reduce(function (stats, game) {
        var issue = getResult(team, game);
        var pointsFor = team.id === game.teamA ? game.scoreA : game.scoreB;
        var pointsAgainst = team.id === game.teamA ? game.scoreB : game.scoreA;
        return {
            played: stats.played + (game.scoreA === null ? 0 : 1),
            won: stats.won + (issue === GameIssue.VICTORY ? 1 : 0),
            drawn: stats.drawn + (issue === GameIssue.DRAWN ? 1 : 0),
            lost: stats.lost + (issue === GameIssue.DEFEAT ? 1 : 0),
            score: stats.score + issue,
            pointsFor: stats.pointsFor + pointsFor,
            pointsAgainst: stats.pointsAgainst + pointsAgainst,
            pointsDiff: stats.pointsDiff + pointsFor - pointsAgainst,
        };
    }, initialStats);
};
//# sourceMappingURL=StatsUtils.js.map