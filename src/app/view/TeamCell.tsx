import TableCell from "@material-ui/core/TableCell";
import {parseElementId} from "../data/Utils";
import * as React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Team} from "../data/team/Team";
import {useTournament} from "../TournamentContext";

const useStyles = makeStyles((theme) => ({
    focused: {
        backgroundColor: theme.palette.grey["100"],
    },
}));

type Alignment = 'inherit' | 'left' | 'center' | 'right' | 'justify';

interface TeamCellProps {
    teamId: string,
    teams: Team[],
    focused?: boolean,
    align?: Alignment,
};

export const TeamCell = ({teamId,focused,  align= "left"}: TeamCellProps) => {
    const tournament = useTournament();
    const classes = useStyles();

    return (
        <TableCell component="th" scope="row" align={align}
                   className={focused ? classes.focused : null}>
            {parseElementId(teamId, tournament.teams).label}
        </TableCell>
    );
}