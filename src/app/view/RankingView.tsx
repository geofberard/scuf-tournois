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
import {useTournament} from "../loader/TournamentContext";
import {useCurrentTeam} from "../login/CurrentTeamContext";
import {useCellStyles} from "./shared/TeamCell";

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },

    reduced: {
        width: 40,
        color: theme.palette.grey["600"],
    }
}));

export const RankingView: TournamentView = () => {
    const [tournament] = useTournament();
    const [currentTeam] = useCurrentTeam();
    const classes = useStyles();
    const cellClasses = useCellStyles();

    let narrowAndReduced = `${cellClasses.narrow} ${classes.reduced}`;
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} stickyHeader size="small">
                <TableHead>
                    <TableRow>
                        <TableCell className={cellClasses.narrow}>#</TableCell>
                        <TableCell>Équipe</TableCell>
                        <TableCell align="center">Score</TableCell>
                        <TableCell className={cellClasses.narrow}>V.</TableCell>
                        <TableCell className={cellClasses.narrow}>N.</TableCell>
                        <TableCell className={cellClasses.narrow}>D.</TableCell>
                        <TableCell className={cellClasses.narrow}/>
                        <TableCell className={cellClasses.narrow}>Joués</TableCell>
                        <TableCell className={cellClasses.narrow}>Marq.</TableCell>
                        <TableCell className={cellClasses.narrow}>Enc.</TableCell>
                        <TableCell className={cellClasses.narrow}>Diff.</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tournament.teams
                        .map(team => ({...team, ...computeStats(team, tournament.games)}))
                        .sort(sortByScore)
                        .map((team, index) => (
                            <TableRow key={team.id}
                                      className={currentTeam && team.id === currentTeam.id ? cellClasses.focusedMain : null}>
                                <TableCell className={cellClasses.narrow}>{index + 1}</TableCell>
                                <TableCell>{team.label}</TableCell>
                                <TableCell align="center">{team.score}</TableCell>
                                <TableCell className={cellClasses.narrow} >{team.won}</TableCell>
                                <TableCell className={cellClasses.narrow} >{team.drawn}</TableCell>
                                <TableCell className={cellClasses.narrow} >{team.lost}</TableCell>
                                <TableCell className={cellClasses.narrow}/>
                                <TableCell className={narrowAndReduced}>{team.played}</TableCell>
                                <TableCell className={narrowAndReduced}>{team.pointsFor}</TableCell>
                                <TableCell className={narrowAndReduced}>{team.pointsAgainst}</TableCell>
                                <TableCell className={narrowAndReduced}>{team.pointsDiff}</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};