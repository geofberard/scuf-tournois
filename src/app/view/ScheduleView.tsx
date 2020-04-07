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

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
}));

export const ScheduleView: TournamentView = ({tournament}) => {
    const classes = useStyles();

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
                        .map((game, index) => (
                            <TableRow key={game.id}>
                                <TableCell component="th" scope="row">{game.time.toLocaleTimeString()}</TableCell>
                                <TableCell component="th" scope="row">{game.court}</TableCell>
                                <TableCell component="th" scope="row">{game.teamA}</TableCell>
                                <TableCell component="th" scope="row">{game.teamB}</TableCell>
                                <TableCell component="th" scope="row">{game.referee}</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};