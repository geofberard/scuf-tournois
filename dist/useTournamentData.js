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
                var dateArray = driveData.getValue(i, 0);
                var teamA = driveData.getValue(i, 2);
                var teamB = driveData.getValue(i, 3);
                gamesData.push({
                    id: "" + dateArray[0] + dateArray[1] + teamA + teamB,
                    time: new Date(today.getFullYear(), today.getMonth(), today.getDate(), dateArray[0], dateArray[1]),
                    court: driveData.getValue(i, 1),
                    teamA: teamA,
                    teamB: teamB,
                    referee: driveData.getValue(i, 4),
                    scoreA: driveData.getValue(i, 5),
                    scoreB: driveData.getValue(i, 6),
                });
            }
            setGamesData(gamesData);
        });
    }
}); };
export var useTournamentData = function (driveKey) {
    var _a = useState(), teams = _a[0], setTeams = _a[1];
    var _b = useState(), games = _b[0], setGames = _b[1];
    var _c = useState(), games = _c[0], setGames = _c[1];
    if (flag) {
        var teamsDataLoaderTemp_1 = (loadTeamData(driveKey, setTeams));
        var gamesDataLoaderTemp_1 = (loadGameData(driveKey, setGames));
        // @ts-ignore
        google.load('visualization', '1.0', { 'packages': ['controls', 'corechart', 'table'] });
        // @ts-ignore
        google.setOnLoadCallback(function () {
            teamsDataLoaderTemp_1.load();
            setInterval(teamsDataLoaderTemp_1.load, 30000);
        });
        // @ts-ignore
        google.setOnLoadCallback(function () {
            gamesDataLoaderTemp_1.load();
            setInterval(gamesDataLoaderTemp_1.load, 30000);
        });
        flag = false;
    }
    return teams && games ? { teams: teams, games: games } : undefined;
};
//# sourceMappingURL=useTournamentData.js.map