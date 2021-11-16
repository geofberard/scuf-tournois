import { Stats } from "./Stats";
import { Team } from "../team/Team";
import { Game } from "../game/Game";

export enum GameIssue {
  VICTORY = 3, DEFEAT = 1, DRAWN = 0, NOT_PLAYED = 4
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

export const getWinner = (game: Game) => {
  if (game.scoreA === game.scoreB) {
    return undefined;
  }
  return game.scoreA > game.scoreB ? game.teamA : game.teamB;
};

export const getResult = (team: Team, game: Game) => {
  if (!game.scoreA || !game.scoreB) {
    return GameIssue.NOT_PLAYED;
  }

  const winner = getWinner(game);

  if (!winner) {
    return GameIssue.DRAWN;
  }

  return winner === team.id ? GameIssue.VICTORY : GameIssue.DEFEAT;
};

const getPoints = (issue: GameIssue) => {
  switch (issue) {
    case GameIssue.VICTORY:
      return 3;
    case GameIssue.DRAWN:
      return 1;
    default:
      return 0;
  }
};

export const computeStats: (team: Team, games: Game[]) => Stats = (team, games) =>
  games
    .filter(game => game.teamA === team.id || game.teamB === team.id)
    .reduce((stats, game) => {
      const issue = getResult(team, game);
      const pointsFor = team.id === game.teamA ? game.scoreA : game.scoreB;
      const pointsAgainst = team.id === game.teamA ? game.scoreB : game.scoreA;
      return {
        played: stats.played + (game.scoreA === null ? 0 : 1),
        won: stats.won + (issue === GameIssue.VICTORY ? 1 : 0),
        drawn: stats.drawn + (issue === GameIssue.DRAWN ? 1 : 0),
        lost: stats.lost + (issue === GameIssue.DEFEAT ? 1 : 0),
        score: stats.score + getPoints(issue),
        pointsFor: stats.pointsFor + pointsFor,
        pointsAgainst: stats.pointsAgainst + pointsAgainst,
        pointsDiff: stats.pointsDiff + pointsFor - pointsAgainst,
      };
    }, initialStats);
