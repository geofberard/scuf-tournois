import * as React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { sortByName } from "../data/team/TeamUtils";
import { useTournament } from "../loader/TournamentContext";
import { useCurrentTeam } from "./CurrentTeamContext";

const useStyles = makeStyles(() =>
  createStyles({
    select: {
      width: 200,
    },

  }));

export const TeamSelector = () => {
  const [tournament] = useTournament();
  const [currentTeam, setCurrentTeam] = useCurrentTeam();
  const classes = useStyles();

  return (
    <FormControl variant="outlined">
      <InputLabel htmlFor="outlined-age-native-simple">Choisir une équipe</InputLabel>
      <Select
        className={classes.select}
        native
        value={currentTeam ? currentTeam.id : ""}
        onChange={event => setCurrentTeam(tournament.teams.find(team => team.id === event.target.value))}
        label="Choisir une équipe"
      >
        <option aria-label="None" value="" />
        {tournament.teams
          .sort(sortByName)
          .map(team => <option value={team.id}>{team.label}</option>)}
      </Select>
    </FormControl>
  );
};
