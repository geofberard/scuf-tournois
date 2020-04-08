import TableCell from "@material-ui/core/TableCell";
import {parseElementId} from "../data/Utils";
import * as React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useTournament} from "../TournamentContext";
import {useCurrentTeam} from "../CurrentTeamContext";

const useStyles = makeStyles((theme) => ({
    focused: {
        backgroundColor: theme.palette.grey["100"],
    },
}));

type Alignment = 'inherit' | 'left' | 'center' | 'right' | 'justify';

interface TeamCellProps {
    teamId: string,
    align?: Alignment,
};

export const TeamCell = ({teamId,  align= "left"}: TeamCellProps) => {
    const tournament = useTournament();
    const [currentTeam] = useCurrentTeam();
    const classes = useStyles();

    return (
        <TableCell component="th" scope="row" align={align}
                   className={currentTeam && teamId === currentTeam.id ? classes.focused : null}>
            {parseElementId(teamId, tournament.teams).label}
        </TableCell>
    );
}