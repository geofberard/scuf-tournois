import {Stats} from "./Stats";
import {Team} from "./Team";
import {Game} from "./Game";

enum GameIssue {
    VICTORY = 3, DEFEAT = 1, DRAWN = 0
}

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

const getResult = (teamId: String, game: Game) => {
    if (game.scoreA === game.scoreB) {
        return GameIssue.DRAWN;
    }
    return game.teamA === teamId && game.scoreA > game.scoreB || game.teamB === teamId && game.scoreA < game.scoreB ? GameIssue.VICTORY : GameIssue.DEFEAT;
};

export const computeStats: (team: Team, games: Game[]) => Stats = (team, games) => {
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