import {Game} from "./Game";
import {Team} from "../team/Team";

export const sortByDate = (gameA:Game, gameB:Game) => gameA.time.getTime() - gameB.time.getTime();

export const filterTeam = (team: Team) => (game: Game) => !team || game.teamA === team.id || game.teamB === team.id || game.referee === team.id;