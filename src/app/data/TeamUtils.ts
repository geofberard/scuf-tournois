import {Team} from "./Team";

export const sortByName = (teamA: Team, teamB: Team) => ("" +teamA.label).localeCompare(teamB.label);

export const sortByScore = (teamA: Team, teamB: Team) => {
    if(teamA.stats.score === teamB.stats.score) {
        return teamA.stats.pointsDiff < teamB.stats.pointsDiff ? 1 : -1;
    }
    return teamA.stats.score < teamB.stats.score ? 1 : -1;
};