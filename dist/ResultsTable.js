import * as React from 'react';
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
var useStyles = makeStyles(function (theme) { return ({
    table: {
        minWidth: 650,
    },
    focused: {
        backgroundColor: theme.palette.grey["200"],
    }
}); });
var sortTeam = function (teamA, teamB) {
    if (teamA.stats.score === teamB.stats.score) {
        return teamA.stats.pointsDiff < teamB.stats.pointsDiff ? 1 : -1;
    }
    return teamA.stats.score < teamB.stats.score ? 1 : -1;
};
export var ResultsTable = function (_a) {
    var teams = _a.teams, focus = _a.focus;
    var classes = useStyles();
    return (React.createElement(TableContainer, { component: Paper },
        React.createElement(Table, { className: classes.table, stickyHeader: true, size: "small" },
            React.createElement(TableHead, null,
                React.createElement(TableRow, null,
                    React.createElement(TableCell, { align: "right" }, "#"),
                    React.createElement(TableCell, null, "\u00C9quipe"),
                    React.createElement(TableCell, { align: "right" }, "Score"),
                    React.createElement(TableCell, { align: "right" }, "Jou\u00E9s"),
                    React.createElement(TableCell, { align: "right" }, "V."),
                    React.createElement(TableCell, { align: "right" }, "N."),
                    React.createElement(TableCell, { align: "right" }, "D."),
                    React.createElement(TableCell, { align: "right" }, "Marq."),
                    React.createElement(TableCell, { align: "right" }, "Enc."),
                    React.createElement(TableCell, { align: "right" }, "Diff."))),
            React.createElement(TableBody, null, teams
                .sort(sortTeam)
                .map(function (row, index) { return (React.createElement(TableRow, { key: row.id, className: focus && row === focus ? classes.focusedNeutral : null },
                React.createElement(TableCell, { align: "right" }, index + 1),
                React.createElement(TableCell, { component: "th", scope: "row" }, row.label),
                React.createElement(TableCell, { align: "right" }, row.stats.score),
                React.createElement(TableCell, { align: "right" }, row.stats.played),
                React.createElement(TableCell, { align: "right" }, row.stats.won),
                React.createElement(TableCell, { align: "right" }, row.stats.drawn),
                React.createElement(TableCell, { align: "right" }, row.stats.lost),
                React.createElement(TableCell, { align: "right" }, row.stats.pointsFor),
                React.createElement(TableCell, { align: "right" }, row.stats.pointsAgainst),
                React.createElement(TableCell, { align: "right" }, row.stats.pointsDiff))); })))));
};
//# sourceMappingURL=ResultsTable.js.map