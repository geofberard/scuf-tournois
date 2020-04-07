import * as React from 'react';
import {FC} from 'react';
import {Team} from "./data/team/Team";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import {sortByName} from "./data/team/TeamUtils";

type TeamSetter = (team: Team) => void;

interface TeamSelectorProps {
    currentTeam: Team,
    teams: Team[],
    onChange: TeamSetter,
}

export const TeamSelector: FC<TeamSelectorProps> = ({currentTeam, teams, onChange}) => (
    <FormControl variant="outlined">
        <InputLabel htmlFor="outlined-age-native-simple">Équipe</InputLabel>
        <Select
            native
            value={currentTeam ? currentTeam.id : ""}
            onChange={(event) => onChange(teams.find(team => team.id === event.target.value))}
            label="Équipe"
        >
            <option aria-label="None" value=""/>
            {teams
                .sort(sortByName)
                .map(team => <option value={team.id}>{team.label}</option>)}
        </Select>
    </FormControl>
);