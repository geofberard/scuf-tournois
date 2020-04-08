var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as React from 'react';
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import { sortByScore } from "../data/team/TeamUtils";
import { computeStats } from "../data/stats/StatsUtils";
import { useTournament } from "../TournamentContext";
import { useCurrentTeam } from "../CurrentTeamContext";
import { useCellStyles } from "./TeamCell";
var useStyles = makeStyles(function (theme) { return ({
    table: {
        minWidth: 650,
    },
    focused: {
        "& td": {
            fontWeight: "bold",
        },
        backgroundColor: theme.palette.grey["100"],
    },
    reduced: {
        width: 40,
        color: theme.palette.grey["600"],
    }
}); });
export var RankingView = function () {
    var tournament = useTournament();
    var currentTeam = useCurrentTeam()[0];
    var classes = useStyles();
    var cellClasses = useCellStyles();
    var narrowAndReduced = cellClasses.narrow + " " + classes.reduced;
    return (React.createElement(TableContainer, { component: Paper },
        React.createElement(Table, { className: classes.table, stickyHeader: true, size: "small" },
            React.createElement(TableHead, null,
                React.createElement(TableRow, null,
                    React.createElement(TableCell, { className: cellClasses.narrow }, "#"),
                    React.createElement(TableCell, null, "\u00C9quipe"),
                    React.createElement(TableCell, { align: "center" }, "Score"),
                    React.createElement(TableCell, { className: cellClasses.narrow }, "V."),
                    React.createElement(TableCell, { className: cellClasses.narrow }, "N."),
                    React.createElement(TableCell, { className: cellClasses.narrow }, "D."),
                    React.createElement(TableCell, { className: cellClasses.narrow }),
                    React.createElement(TableCell, { className: cellClasses.narrow }, "Jou\u00E9s"),
                    React.createElement(TableCell, { className: cellClasses.narrow }, "Marq."),
                    React.createElement(TableCell, { className: cellClasses.narrow }, "Enc."),
                    React.createElement(TableCell, { className: cellClasses.narrow }, "Diff."))),
            React.createElement(TableBody, null, tournament.teams
                .map(function (team) { return (__assign(__assign({}, team), computeStats(team, tournament.games))); })
                .sort(sortByScore)
                .map(function (team, index) { return (React.createElement(TableRow, { key: team.id, className: currentTeam && team.id === currentTeam.id ? classes.focused : null },
                React.createElement(TableCell, { className: cellClasses.narrow }, index + 1),
                React.createElement(TableCell, null, team.label),
                React.createElement(TableCell, { align: "center" }, team.score),
                React.createElement(TableCell, { className: cellClasses.narrow }, team.won),
                React.createElement(TableCell, { className: cellClasses.narrow }, team.drawn),
                React.createElement(TableCell, { className: cellClasses.narrow }, team.lost),
                React.createElement(TableCell, { className: cellClasses.narrow }),
                React.createElement(TableCell, { className: narrowAndReduced }, team.played),
                React.createElement(TableCell, { className: narrowAndReduced }, team.pointsFor),
                React.createElement(TableCell, { className: narrowAndReduced }, team.pointsAgainst),
                React.createElement(TableCell, { className: narrowAndReduced }, team.pointsDiff))); })))));
};
//# sourceMappingURL=RankingView.js.map