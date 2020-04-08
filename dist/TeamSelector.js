import * as React from 'react';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { sortByName } from "./data/team/TeamUtils";
import { useTournament } from "./TournamentContext";
import { useCurrentTeam } from "./CurrentTeamContext";
export var TeamSelector = function () {
    var tournament = useTournament();
    var _a = useCurrentTeam(), currentTeam = _a[0], setCurrentTeam = _a[1];
    return (React.createElement(FormControl, { variant: "outlined" },
        React.createElement(InputLabel, { htmlFor: "outlined-age-native-simple" }, "\u00C9quipe"),
        React.createElement(Select, { native: true, value: currentTeam ? currentTeam.id : "", onChange: function (event) { return setCurrentTeam(tournament.teams.find(function (team) { return team.id === event.target.value; })); }, label: "\u00C9quipe" },
            React.createElement("option", { "aria-label": "None", value: "" }),
            tournament.teams
                .sort(sortByName)
                .map(function (team) { return React.createElement("option", { value: team.id }, team.label); }))));
};
//# sourceMappingURL=TeamSelector.js.map