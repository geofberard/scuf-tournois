import {Team} from "./Team";
import {Stats} from "./Stats";

export const sortByName = (teamA: Team, teamB: Team) => ("" +teamA.label).localeCompare(teamB.label);

export const sortByScore = (teamA: Team & Stats, teamB: Team & Stats) => {
    if(teamA.score === teamB.score) {
        return teamA.pointsDiff < teamB.pointsDiff ? 1 : -1;
    }
    return teamA.score < teamB.score ? 1 : -1;
};