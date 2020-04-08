import {Team} from "./team/Team";
import {Game} from "./game/Game";
import {Rule} from "./rule/Rule";

export interface Tournament {
    teams: Team[],
    games: Game[],
    rules: Rule[],
}