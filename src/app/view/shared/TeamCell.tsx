import TableCell from "@material-ui/core/TableCell";
import * as React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { parseElementId } from "../../data/Utils";
import { useTournament } from "../../loader/TournamentContext";

export const useCellStyles = makeStyles(theme => ({
  narrow: {
    textAlign: "center",
    paddingLeft: 5,
    paddingRight: 5,
    "&:first-child": {
      textAlign: "right",
    },
  },

  focusedMain: {
    "& td": {
      fontWeight: "bold",
    },
    backgroundColor: theme.palette.grey["100"],
  },

  focusedGood: {
    backgroundColor: theme.palette.success["50"],
  },

  focusedBad: {
    backgroundColor: theme.palette.error["50"],
  },

  focusedNeutral: {
    backgroundColor: theme.palette.grey["50"],
  },

  teamA: {
    fontWeight: "bold",
    textAlign: "right",
    paddingRight: 5,
  },

  teamB: {
    fontWeight: "bold",
    textAlign: "left",
    paddingLeft: 5,
  },

  tableCell: {
    // fontWeight: "bold",
  },
}));

interface TeamCellProps {
    teamId: string,
    className?: string,
}


export const TeamCell = ({ teamId, className = "" }: TeamCellProps) => {
  const [tournament] = useTournament();
  const classes = useCellStyles();

  return (
    <TableCell
      component="th"
      scope="row"
      className={`${classes.tableCell} ${className}`}
    >
      {parseElementId(teamId, tournament.teams).label}
    </TableCell>
  );
};
