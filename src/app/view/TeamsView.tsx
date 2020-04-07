import * as React from 'react';
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import {sortByName} from "../data/team/TeamUtils";
import {Container} from "@material-ui/core";
import {TournamentView} from "./TournamentView";

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 0,
    },

    focused: {
        backgroundColor: theme.palette.grey["100"],
    },
}));

export const TeamsView: TournamentView = ({tournament, currentTeam}) => {
    const classes = useStyles();

    return (
        <Container maxWidth="xs">
            <TableContainer component={Paper}>
                <Table className={classes.table} stickyHeader size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Équipe</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tournament.teams
                            .sort(sortByName)
                            .map((team, index) => (
                                <TableRow key={team.id}
                                          className={currentTeam && team.id === currentTeam.id ? classes.focused : null}>
                                    <TableCell component="th" scope="row">{team.label}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};