import {useState} from "react";
import {Tournament} from "./data/Tournament";
import {Stats} from "./data/Stats";

let flag = true;

interface TeamSheetData {
    id: string,
    label: string,
}

interface GameSheetData {
    teamA: string,
    teamB: string,
    time: Date,
    court: string,
    scoreA: number,
    scoreB: number,
}

const loadTeamData = (driveKey: string, setTeamsData: (data: TeamSheetData[]) => void) => ({
    load: () => {
        // @ts-ignore
        const query = new google.visualization.Query("https://docs.google.com/spreadsheets/d/" + driveKey + "/gviz/tq?sheet=Teams&headers=1");
        query.send((response) => {
            const driveData = response.getDataTable();
            const teamsData: TeamSheetData[] = [];
            for (let i = 0; i < driveData.getNumberOfRows(); i++) {
                teamsData.push({
                    id: driveData.getValue(i, 0) as string,
                    label: driveData.getValue(i, 1) as string,
                } as TeamSheetData);
            }
            setTeamsData(teamsData);
        });
    }
});

const loadGameData = (driveKey: string, setGamesData: (data: GameSheetData[]) => void) => ({
    load: () => {
        const today: Date = new Date(Date.now());
        // @ts-ignore
        const query = new google.visualization.Query("https://docs.google.com/spreadsheets/d/" + driveKey + "/gviz/tq?sheet=Games&headers=1");
        query.send((response) => {
            const driveData = response.getDataTable();
            const gamesData: GameSheetData[] = [];
            for (let i = 0; i < driveData.getNumberOfRows(); i++) {
                const dateArray = driveData.getValue(i, 2);
                gamesData.push({
                    teamA: driveData.getValue(i, 0) as string,
                    teamB: driveData.getValue(i, 1) as string,
                    time: new Date(today.getFullYear(), today.getMonth(), today.getDate(), dateArray[0], dateArray[1]),
                    court: driveData.getValue(i, 3) as string,
                    scoreA: driveData.getValue(i, 4) as number,
                    scoreB: driveData.getValue(i, 5) as number,
                } as GameSheetData);
            }
            setGamesData(gamesData);
        });
    }
});

const initialStats: Stats = {
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    score: 0,
    pointsFor: 0,
    pointsAgainst: 0,
    pointsDiff: 0,
};

enum GameIssue {
    VICTORY = 3, DEFEAT = 1, DRAWN = 0
}

const getResult = (teamId: String, game: GameSheetData) => {
    if (game.scoreA === game.scoreB) {
        return GameIssue.DRAWN;
    }
    return game.teamA === teamId && game.scoreA > game.scoreB || game.teamB === teamId && game.scoreA < game.scoreB ? GameIssue.VICTORY : GameIssue.DEFEAT;
};

const computeStats: (team: TeamSheetData, games: GameSheetData[]) => Stats = (team, games) => {
    return games.filter(game => game.teamA === team.id || game.teamB === team.id)
        .reduce((stats, game) => {
            const issue = getResult(team.id, game);
            const pointsFor = team.id === game.teamA ? game.scoreA : game.scoreB;
            const pointsAgainst = team.id === game.teamA ? game.scoreB : game.scoreA;
            return {
                played: stats.played + (game.scoreA === null ? 0 : 1),
                won: stats.won + (issue === GameIssue.VICTORY ? 1 : 0),
                drawn: stats.drawn + (issue === GameIssue.DRAWN ? 1 : 0),
                lost: stats.lost + (issue === GameIssue.DEFEAT ? 1 : 0),
                score: stats.score + issue,
                pointsFor: stats.pointsFor + pointsFor,
                pointsAgainst: stats.pointsAgainst + pointsAgainst,
                pointsDiff: stats.pointsDiff + pointsFor - pointsAgainst,
            }
        }, initialStats);
};

export const useTournamentData: (driveKey: string) => Tournament = (driveKey) => {
    const [teamsData, setTeamsData] = useState<TeamSheetData[]>([]);
    const [gamesData, setGamesData] = useState<GameSheetData[]>([]);

    if (flag) {
        const teamsDataLoaderTemp = (loadTeamData(driveKey, setTeamsData));
        const gamesDataLoaderTemp = (loadGameData(driveKey, setGamesData));

        // @ts-ignore
        google.load('visualization', '1.0', {'packages': ['controls', 'corechart', 'table']});

        // @ts-ignore
        google.setOnLoadCallback(() => {
            teamsDataLoaderTemp.load();
            setInterval(teamsDataLoaderTemp.load, 5000);
        });

        // @ts-ignore
        google.setOnLoadCallback(() => {
            gamesDataLoaderTemp.load();
            setInterval(gamesDataLoaderTemp.load, 5000);
        });

        flag = false;
    }

    return {
        teams: teamsData.map(spreadSheet => ({
            id: spreadSheet.id,
            label: spreadSheet.label,
            stats: computeStats(spreadSheet, gamesData)
        })),
        games: gamesData.map(game => ({
            id: "" + game.time + game.teamA + game.teamB,
            time: game.time,
            court: game.court,
            teamA: game.teamA,
            teamB: game.teamB,
            referee: "",
        }))
    } as Tournament;
};