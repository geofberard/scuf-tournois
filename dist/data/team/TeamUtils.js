export var sortByName = function (teamA, teamB) { return ("" + teamA.label).localeCompare(teamB.label); };
export var sortByScore = function (teamA, teamB) {
    if (teamA.score === teamB.score) {
        return teamA.pointsDiff < teamB.pointsDiff ? 1 : -1;
    }
    return teamA.score < teamB.score ? 1 : -1;
};
//# sourceMappingURL=TeamUtils.js.map