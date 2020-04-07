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
import {sortByName} from "./data/TeamUtils";
import {Container} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 0,
    },

    focused: {
        backgroundColor: theme.palette.grey["200"],
    },
}));

interface TeamsTableProps {
    teams: Team[];
    focus?: Team;
}

export const TeamsTable: FC<TeamsTableProps> = ({teams, focus}) => {
    const classes = useStyles();

    return (
        <Container maxWidth="xs">
            <TableContainer component={Paper}>
                <Table className={classes.table} stickyHeader size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Équipe</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {teams
                            .sort(sortByName)
                            .map((row, index) => (
                                <TableRow key={row.id}
                                          className={focus && row.id === focus.id ? classes.focused : null}>
                                    <TableCell component="th" scope="row">{row.label}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};