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
import {filterConcernedTeam, filterNotPlayed, sortByDate} from "../data/game/GameUtils";
import {TeamCell, useCellStyles} from "./TeamCell";
import {useTournament} from "../TournamentContext";
import {useCurrentTeam} from "../login/CurrentTeamContext";
import {now} from "../DateUtils";
import {Game} from "../data/game/Game";

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
}));

export const ScheduleView: TournamentView = () => {
    const [tournament] = useTournament();
    const [currentTeam] = useCurrentTeam();
    const classes = useStyles();
    const cellClasses = useCellStyles();

    const filteredGames = tournament.games
        .filter(filterNotPlayed)
        .filter(filterConcernedTeam(currentTeam))
        .sort(sortByDate);

    const nextTime = filteredGames.find(game => game.time > now()).time;
    const getRowClassName = (game: Game) => {
        return game.time.getTime() == nextTime.getTime()
            ? cellClasses.focusedGood
            : (game.time < nextTime ? cellClasses.focusedBad: "")
    };

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
                    {filteredGames.map((game, index) => (
                            <TableRow key={game.id} className={getRowClassName(game)}>
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