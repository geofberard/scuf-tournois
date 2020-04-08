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

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },

    focused: {
        backgroundColor: theme.palette.grey["100"],
    },
}));

type Alignment = 'inherit' | 'left' | 'center' | 'right' | 'justify';

export const ResultsView: TournamentView = ({tournament, currentTeam}) => {
    const classes = useStyles();

    const TeamCell2 = ({teamId, align= "left"}: {teamId:string, align?: Alignment}) => (
        <TableCell component="th" scope="row" align={align}
                   className={currentTeam && teamId === currentTeam.id ? classes.focused : null}>
            {parseElementId(teamId, tournament.teams).label}
        </TableCell>
    );

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