import {Team} from "./team/Team";
import {Game} from "./game/Game";

export interface Tournament {
    teams: Team[],
    games: Game[]
}