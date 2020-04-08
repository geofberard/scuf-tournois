import TableCell from "@material-ui/core/TableCell";
import { parseElementId } from "../data/Utils";
import * as React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useTournament } from "../TournamentContext";
export var useCellStyles = makeStyles(function (theme) { return ({
    narrow: {
        textAlign: "center",
        paddingLeft: 5,
        paddingRight: 5,
        '&:first-child': {
            textAlign: "right",
        }
    },
    teamA: {
        fontWeight: "bold",
        textAlign: "right",
        paddingRight: 5,
    },
    teamB: {
        fontWeight: "bold",
        textAlign: "left",
        paddingLeft: 5,
    },
    tableCell: {
    // fontWeight: "bold",
    },
}); });
;
export var TeamCell = function (_a) {
    var teamId = _a.teamId, _b = _a.className, className = _b === void 0 ? "" : _b;
    var tournament = useTournament();
    var classes = useCellStyles();
    return (React.createElement(TableCell, { component: "th", scope: "row", className: classes.tableCell + " " + className }, parseElementId(teamId, tournament.teams).label));
};
//# sourceMappingURL=TeamCell.js.map