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
import {filterConcernedTeam, filterPlayingTeam, sortByDate} from "../data/game/GameUtils";
import {parseElementId} from "../data/Utils";
import {TeamCell} from "./TeamCell";
import {useTournament} from "../TournamentContext";

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
}));

export const ResultsView: TournamentView = ({currentTeam}) => {
    const tournament = useTournament();
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} stickyHeader size="small">
                <TableHead>
                    <TableRow>
                        <TableCell align="right">Équipes</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tournament.games
                        .sort(sortByDate)
                        .filter(filterPlayingTeam(currentTeam))
                        .map((game, index) => (
                            <TableRow key={game.id}>
                                <TeamCell teamId={game.teamA} teams={tournament.teams} focused={currentTeam && game.teamA === currentTeam.id} align="right"/>
                                <TeamCell teamId={game.teamB} teams={tournament.teams} focused={currentTeam && game.teamB === currentTeam.id}/>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};