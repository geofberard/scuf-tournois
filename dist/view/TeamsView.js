import * as React from 'react';
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import { sortByName } from "../data/team/TeamUtils";
import { Container } from "@material-ui/core";
import { useTournament } from "../TournamentContext";
import { useCurrentTeam } from "../CurrentTeamContext";
var useStyles = makeStyles(function (theme) { return ({
    table: {
        minWidth: 0,
    },
    focused: {
        "& td": {
            fontWeight: "bold",
        },
        backgroundColor: theme.palette.grey["100"],
    },
}); });
export var TeamsView = function () {
    var tournament = useTournament();
    var currentTeam = useCurrentTeam()[0];
    var classes = useStyles();
    return (React.createElement(Container, { maxWidth: "xs" },
        React.createElement(TableContainer, { component: Paper },
            React.createElement(Table, { className: classes.table, stickyHeader: true, size: "small" },
                React.createElement(TableHead, null,
                    React.createElement(TableRow, null,
                        React.createElement(TableCell, { align: "center" }, "\u00C9quipes"))),
                React.createElement(TableBody, null, tournament.teams
                    .sort(sortByName)
                    .map(function (team, index) { return (React.createElement(TableRow, { key: team.id, className: currentTeam && team.id === currentTeam.id ? classes.focused : null },
                    React.createElement(TableCell, { align: "center", scope: "row" }, team.label))); }))))));
};
//# sourceMappingURL=TeamsView.js.map