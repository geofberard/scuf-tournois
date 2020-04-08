import TableCell from "@material-ui/core/TableCell";
import {parseElementId} from "../data/Utils";
import * as React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useTournament} from "../TournamentContext";

export const useCellStyles = makeStyles((theme) => ({
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
}));

interface TeamCellProps {
    teamId: string,
    className?: string,
};


export const TeamCell = ({teamId,  className= ""}: TeamCellProps) => {
    const tournament = useTournament();
    const classes = useCellStyles();

    return (
        <TableCell component="th" scope="row"
                   className={`${classes.tableCell} ${className}`}>
            {parseElementId(teamId, tournament.teams).label}
        </TableCell>
    );
}