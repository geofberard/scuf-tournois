import { useState } from "react";
var flag = true;
var loadTeamData = function (driveKey, setTeamsData) { return ({
    load: function () {
        // @ts-ignore
        var query = new google.visualization.Query("https://docs.google.com/spreadsheets/d/" + driveKey + "/gviz/tq?sheet=Teams&headers=1");
        query.send(function (response) {
            var driveData = response.getDataTable();
            var teamsData = [];
            for (var i = 0; i < driveData.getNumberOfRows(); i++) {
                teamsData.push({
                    id: driveData.getValue(i, 0),
                    label: driveData.getValue(i, 1),
                });
            }
            setTeamsData(teamsData);
        });
    }
}); };
var loadGameData = function (driveKey, setGamesData) { return ({
    load: function () {
        var today = new Date(Date.now());
        // @ts-ignore
        var query = new google.visualization.Query("https://docs.google.com/spreadsheets/d/" + driveKey + "/gviz/tq?sheet=Games&headers=1");
        query.send(function (response) {
            var driveData = response.getDataTable();
            var gamesData = [];
            for (var i = 0; i < driveData.getNumberOfRows(); i++) {
                var dateArray = driveData.getValue(i, 2);
                gamesData.push({
                    teamA: driveData.getValue(i, 0),
                    teamB: driveData.getValue(i, 1),
                    time: new Date(today.getFullYear(), today.getMonth(), today.getDate(), dateArray[0], dateArray[1]),
                    court: driveData.getValue(i, 3),
                    scoreA: driveData.getValue(i, 4),
                    scoreB: driveData.getValue(i, 5),
                });
            }
            setGamesData(gamesData);
        });
    }
}); };
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
var GameIssue;
(function (GameIssue) {
    GameIssue[GameIssue["VICTORY"] = 3] = "VICTORY";
    GameIssue[GameIssue["DEFEAT"] = 1] = "DEFEAT";
    GameIssue[GameIssue["DRAWN"] = 0] = "DRAWN";
})(GameIssue || (GameIssue = {}));
var getResult = function (teamId, game) {
    if (game.scoreA === game.scoreB) {
        return GameIssue.DRAWN;
    }
    return game.teamA === teamId && game.scoreA > game.scoreB || game.teamB === teamId && game.scoreA < game.scoreB ? GameIssue.VICTORY : GameIssue.DEFEAT;
};
var computeStats = function (team, games) {
    return games.filter(function (game) { return game.teamA === team.id || game.teamB === team.id; })
        .reduce(function (stats, game) {
        var issue = getResult(team.id, game);
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
export var useTournamentData = function (driveKey) {
    var _a = useState([]), teamsData = _a[0], setTeamsData = _a[1];
    var _b = useState([]), gamesData = _b[0], setGamesData = _b[1];
    if (flag) {
        var teamsDataLoaderTemp_1 = (loadTeamData(driveKey, setTeamsData));
        var gamesDataLoaderTemp_1 = (loadGameData(driveKey, setGamesData));
        // @ts-ignore
        google.load('visualization', '1.0', { 'packages': ['controls', 'corechart', 'table'] });
        // @ts-ignore
        google.setOnLoadCallback(function () {
            teamsDataLoaderTemp_1.load();
            setInterval(teamsDataLoaderTemp_1.load, 5000);
        });
        // @ts-ignore
        google.setOnLoadCallback(function () {
            gamesDataLoaderTemp_1.load();
            setInterval(gamesDataLoaderTemp_1.load, 5000);
        });
        flag = false;
    }
    return {
        teams: teamsData.map(function (spreadSheet) { return ({
            id: spreadSheet.id,
            label: spreadSheet.label,
            stats: computeStats(spreadSheet, gamesData)
        }); })
    };
};
//# sourceMappingURL=useTournamentData.js.map