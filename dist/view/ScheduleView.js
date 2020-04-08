import * as React from 'react';
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import { filterConcernedTeam, sortByDate } from "../data/game/GameUtils";
import { TeamCell, useCellStyles } from "./TeamCell";
import { useTournament } from "../TournamentContext";
import { useCurrentTeam } from "../CurrentTeamContext";
var useStyles = makeStyles(function (theme) { return ({
    table: {
        minWidth: 650,
    },
}); });
export var ScheduleView = function () {
    var tournament = useTournament();
    var currentTeam = useCurrentTeam()[0];
    var classes = useStyles();
    var cellClasses = useCellStyles();
    return (React.createElement(TableContainer, { component: Paper },
        React.createElement(Table, { className: classes.table, stickyHeader: true, size: "small" },
            React.createElement(TableHead, null,
                React.createElement(TableRow, null,
                    React.createElement(TableCell, null, "Heure"),
                    React.createElement(TableCell, null, "Terrain"),
                    React.createElement(TableCell, { align: "center", colSpan: 3 }, "\u00C9quipes"),
                    React.createElement(TableCell, null, "Arbitre"))),
            React.createElement(TableBody, null, tournament.games
                .sort(sortByDate)
                .filter(filterConcernedTeam(currentTeam))
                .map(function (game, index) { return (React.createElement(TableRow, { key: game.id },
                React.createElement(TableCell, null, game.time.toLocaleTimeString()),
                React.createElement(TableCell, null, game.court),
                React.createElement(TeamCell, { teamId: game.teamA, className: cellClasses.teamA }),
                React.createElement(TableCell, { className: cellClasses.narrow }, "-"),
                React.createElement(TeamCell, { teamId: game.teamB, className: cellClasses.teamB }),
                React.createElement(TeamCell, { teamId: game.referee }))); })))));
};
//# sourceMappingURL=ScheduleView.js.map