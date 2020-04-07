import {Team} from "./Team";
import {Game} from "./Game";

export interface Tournament {
    teams: Team[],
    games: Game[]
}