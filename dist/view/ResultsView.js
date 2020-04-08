import * as React from 'react';
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import { filterPlayingTeam, sortByDate } from "../data/game/GameUtils";
import { TeamCell, useCellStyles } from "./TeamCell";
import { useTournament } from "../TournamentContext";
import { useCurrentTeam } from "../CurrentTeamContext";
import { getWinner } from "../data/stats/StatsUtils";
var useStyles = makeStyles(function (theme) { return ({
    table: {
        minWidth: 650,
    },
    bold: {
        fontWeight: "bold",
    },
    looser: {
        color: theme.palette.grey["500"],
    },
}); });
export var ResultsView = function () {
    var tournament = useTournament();
    var currentTeam = useCurrentTeam()[0];
    var classes = useStyles();
    var cellClasses = useCellStyles();
    var scoreClass = cellClasses.narrow + " " + classes.bold;
    return (React.createElement(TableContainer, { component: Paper },
        React.createElement(Table, { className: classes.table, stickyHeader: true, size: "small" },
            React.createElement(TableBody, null, tournament.games
                .sort(sortByDate)
                .filter(filterPlayingTeam(currentTeam))
                .map(function (game, index) {
                var winner = getWinner(game);
                var extraClassA = winner === game.teamB ? classes.looser : "";
                var extraClassB = winner === game.teamA ? classes.looser : "";
                return (React.createElement(TableRow, { key: game.id },
                    React.createElement(TeamCell, { className: cellClasses.teamA + " " + extraClassA, teamId: game.teamA }),
                    React.createElement(TableCell, { className: scoreClass + " " + extraClassA }, game.scoreA),
                    React.createElement(TableCell, { className: scoreClass }, "-"),
                    React.createElement(TableCell, { className: scoreClass + " " + extraClassB }, game.scoreB),
                    React.createElement(TeamCell, { className: cellClasses.teamB + " " + extraClassB, teamId: game.teamB })));
            })))));
};
//# sourceMappingURL=ResultsView.js.map