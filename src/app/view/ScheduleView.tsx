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
import {TeamCell, useCellStyles} from "./TeamCell";
import {useTournament} from "../TournamentContext";
import {useCurrentTeam} from "../CurrentTeamContext";

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
}));

export const ScheduleView: TournamentView = () => {
    const tournament = useTournament();
    const [currentTeam] = useCurrentTeam();
    const classes = useStyles();
    const cellClasses = useCellStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} stickyHeader size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Heure</TableCell>
                        <TableCell>Terrain</TableCell>
                        <TableCell align="center" colSpan={3}>Équipes</TableCell>
                        <TableCell>Arbitre</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tournament.games
                        .sort(sortByDate)
                        .filter(filterConcernedTeam(currentTeam))
                        .map((game, index) => (
                            <TableRow key={game.id}>
                                <TableCell>{game.time.toLocaleTimeString()}</TableCell>
                                <TableCell>{game.court}</TableCell>
                                <TeamCell teamId={game.teamA} className={cellClasses.teamA}/>
                                <TableCell className={cellClasses.narrow}>-</TableCell>
                                <TeamCell teamId={game.teamB} className={cellClasses.teamB}/>
                                <TeamCell teamId={game.referee}/>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};