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
import {useCurrentTeam} from "../CurrentTeamContext";

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
}));

export const ResultsView: TournamentView = () => {
    const tournament = useTournament();
    const [currentTeam] = useCurrentTeam();
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
                                <TeamCell teamId={game.teamA} align="right"/>
                                <TeamCell teamId={game.teamB}/>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};