import * as React from 'react';
import {FC} from 'react';
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import {Team} from "./data/Team";
import {sortByScore} from "./data/TeamUtils";

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },

    focused: {
        backgroundColor: theme.palette.grey["200"],
    },

    reduced: {
        color: theme.palette.grey["600"],
        // fontWeight: 'bold',
    }
}));

interface ResultsTableProps {
    teams: Team[];
    focus?: Team;
}

export const ResultsTable: FC<ResultsTableProps> = ({teams, focus}) => {
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
                    {teams
                        .sort(sortByScore)
                        .map((team, index) => (
                        <TableRow key={team.id} className={focus && team.id === focus.id ? classes.focused : null}>
                            <TableCell align="right">{index + 1}</TableCell>
                            <TableCell component="th" scope="row">{team.label}</TableCell>
                            <TableCell align="right">{team.stats.score}</TableCell>
                            <TableCell align="right">{team.stats.won}</TableCell>
                            <TableCell align="right">{team.stats.drawn}</TableCell>
                            <TableCell align="right">{team.stats.lost}</TableCell>
                            <TableCell align="right" className={classes.reduced}>{team.stats.played}</TableCell>
                            <TableCell align="right" className={classes.reduced}>{team.stats.pointsFor}</TableCell>
                            <TableCell align="right" className={classes.reduced}>{team.stats.pointsAgainst}</TableCell>
                            <TableCell align="right" className={classes.reduced}>{team.stats.pointsDiff}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};