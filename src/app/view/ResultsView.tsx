import * as React from 'react';
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import {TournamentView} from "./TournamentView";
import {filterPlayed, filterPlayingTeam, sortByDateRev} from "../data/game/GameUtils";
import {TeamCell, useCellStyles} from "./TeamCell";
import {useTournament} from "../TournamentContext";
import {useCurrentTeam} from "../login/CurrentTeamContext";
import {GameIssue, getResult, getWinner} from "../data/stats/StatsUtils";
import {Game} from "../data/game/Game";

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

    const getRawClassName = (game: Game) => {
        switch(getResult(currentTeam, game)) {
            case GameIssue.VICTORY:
                return cellClasses.focusedGood;
            case GameIssue.DEFEAT:
                return cellClasses.focusedBad;
            default:
                return cellClasses.focusedNeutral;
        }
    };

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} stickyHeader size="small">
                <TableBody>
                    {tournament.games
                        .filter(filterPlayed)
                        .filter(filterPlayingTeam(currentTeam))
                        .sort(sortByDateRev)
                        .map((game, index) => {
                            const winner = getWinner(game);
                            let extraClassA = winner === game.teamB ? classes.looser : "";
                            let extraClassB = winner === game.teamA ? classes.looser : "";
                            return (
                                <TableRow key={game.id} className={currentTeam ? getRawClassName(game) : ""}>
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