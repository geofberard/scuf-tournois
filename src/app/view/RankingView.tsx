import * as React from 'react';
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import {sortByScore} from "../data/team/TeamUtils";
import {TournamentView} from "./TournamentView";
import {computeStats} from "../data/stats/StatsUtils";
import {useTournament} from "../TournamentContext";
import {useCurrentTeam} from "../CurrentTeamContext";

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },

    focused: {
        backgroundColor: theme.palette.grey["100"],
    },

    reduced: {
        color: theme.palette.grey["600"],
    }
}));

export const RankingView: TournamentView = () => {
    const tournament = useTournament();
    const [currentTeam] = useCurrentTeam();
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} stickyHeader size="small">
                <TableHead>
                    <TableRow>
                        <TableCell align="right">#</TableCell>
                        <TableCell>Équipe</TableCell>
                        <TableCell align="right">Score</TableCell>
                        <TableCell align="right">V.</TableCell>
                        <TableCell align="right">N.</TableCell>
                        <TableCell align="right">D.</TableCell>
                        <TableCell align="right">Joués</TableCell>
                        <TableCell align="right">Marq.</TableCell>
                        <TableCell align="right">Enc.</TableCell>
                        <TableCell align="right">Diff.</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tournament.teams
                        .map(team => ({...team, ...computeStats(team, tournament.games)}))
                        .sort(sortByScore)
                        .map((team, index) => (
                            <TableRow key={team.id}
                                      className={currentTeam && team.id === currentTeam.id ? classes.focused : null}>
                                <TableCell align="right">{index + 1}</TableCell>
                                <TableCell component="th" scope="row">{team.label}</TableCell>
                                <TableCell align="right">{team.score}</TableCell>
                                <TableCell align="right">{team.won}</TableCell>
                                <TableCell align="right">{team.drawn}</TableCell>
                                <TableCell align="right">{team.lost}</TableCell>
                                <TableCell align="right" className={classes.reduced}>{team.played}</TableCell>
                                <TableCell align="right" className={classes.reduced}>{team.pointsFor}</TableCell>
                                <TableCell align="right"
                                           className={classes.reduced}>{team.pointsAgainst}</TableCell>
                                <TableCell align="right" className={classes.reduced}>{team.pointsDiff}</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};