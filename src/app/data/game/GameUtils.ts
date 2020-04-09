import {Game} from "./Game";
import {Team} from "../team/Team";

export const sortByDate = (gameA:Game, gameB:Game) => gameA.time.getTime() - gameB.time.getTime();

export const sortByDateRev = (gameA:Game, gameB:Game) => gameB.time.getTime() - gameA.time.getTime();

export const filterPlayingTeam = (team: Team) => (game: Game) => !team || game.teamA === team.id || game.teamB === team.id;

export const filterConcernedTeam = (team: Team) => (game: Game) => filterPlayingTeam(team)(game) || game.referee === team.id;

export const filterPlayed =  (game: Game) => game.scoreA != null && game.scoreB != null;

export const filterNotPlayed =  (game: Game) => game.scoreA == null && game.scoreB == null;