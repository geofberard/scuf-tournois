import * as React from 'react';
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import {TournamentView} from "./TournamentView";
import {filterTeam, sortByDate} from "../data/game/GameUtils";
import {parseElementId} from "../data/Utils";

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },

    focused: {
        backgroundColor: theme.palette.grey["100"],
    },
}));

export const ScheduleView: TournamentView = ({tournament, currentTeam}) => {
    const classes = useStyles();

    const TeamCell = ({teamId}: {teamId:string}) => (
        <TableCell component="th" scope="row"
                   className={currentTeam && teamId === currentTeam.id ? classes.focused : null}>
            {parseElementId(teamId, tournament.teams).label}
        </TableCell>
    );

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} stickyHeader size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Heure</TableCell>
                        <TableCell>Terrain</TableCell>
                        <TableCell>Équipes</TableCell>
                        <TableCell></TableCell>
                        <TableCell>Arbitre</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tournament.games
                        .sort(sortByDate)
                        .filter(filterTeam(currentTeam))
                        .map((game, index) => (
                            <TableRow key={game.id}>
                                <TableCell component="th" scope="row">{game.time.toLocaleTimeString()}</TableCell>
                                <TableCell component="th" scope="row">{game.court}</TableCell>
                                <TeamCell teamId={game.teamA}/>
                                <TeamCell teamId={game.teamB}/>
                                <TeamCell teamId={game.referee}/>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};