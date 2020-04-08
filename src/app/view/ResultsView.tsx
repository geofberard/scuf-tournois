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
import {filterPlayingTeam, sortByDate} from "../data/game/GameUtils";
import {TeamCell, useCellStyles} from "./TeamCell";
import {useTournament} from "../TournamentContext";
import {useCurrentTeam} from "../CurrentTeamContext";
import {getWinner} from "../data/stats/StatsUtils";

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },

    bold: {
        fontWeight: "bold",
    },

    looser: {
        color: theme.palette.grey["500"],
    },
}));

export const ResultsView: TournamentView = () => {
    const tournament = useTournament();
    const [currentTeam] = useCurrentTeam();

    const classes = useStyles();
    const cellClasses = useCellStyles();

    const scoreClass = `${cellClasses.narrow} ${classes.bold}`;

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} stickyHeader size="small">
                <TableBody>
                    {tournament.games
                        .sort(sortByDate)
                        .filter(filterPlayingTeam(currentTeam))
                        .map((game, index) => {
                            const winner = getWinner(game);
                            let extraClassA = winner === game.teamB ? classes.looser : "";
                            let extraClassB = winner === game.teamA ? classes.looser : "";
                            return (
                                <TableRow key={game.id}>
                                    <TeamCell className={`${cellClasses.teamA} ${extraClassA}`} teamId={game.teamA}/>
                                    <TableCell className={`${scoreClass} ${extraClassA}`}>{game.scoreA}</TableCell>
                                    <TableCell className={scoreClass}>-</TableCell>
                                    <TableCell className={`${scoreClass} ${extraClassB}`}>{game.scoreB}</TableCell>
                                    <TeamCell className={`${cellClasses.teamB} ${extraClassB}`} teamId={game.teamB}/>
                                </TableRow>
                            )
                        })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};