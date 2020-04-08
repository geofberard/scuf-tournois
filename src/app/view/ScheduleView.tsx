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
import {filterConcernedTeam, sortByDate} from "../data/game/GameUtils";
import {TeamCell} from "./TeamCell";
import {useTournament} from "../TournamentContext";

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
}));

export const ScheduleView: TournamentView = ({currentTeam}) => {
    const tournament = useTournament();
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
                        .sort(sortByDate)
                        .filter(filterConcernedTeam(currentTeam))
                        .map((game, index) => (
                            <TableRow key={game.id}>
                                <TableCell component="th" scope="row">{game.time.toLocaleTimeString()}</TableCell>
                                <TableCell component="th" scope="row">{game.court}</TableCell>
                                <TeamCell teamId={game.teamA} teams={tournament.teams} focused={currentTeam && game.teamA === currentTeam.id} align="right"/>
                                <TeamCell teamId={game.teamB} teams={tournament.teams} focused={currentTeam && game.teamB === currentTeam.id}/>
                                <TeamCell teamId={game.referee} teams={tournament.teams} focused={currentTeam && game.referee === currentTeam.id}/>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};