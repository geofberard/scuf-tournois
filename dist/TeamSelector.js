import * as React from 'react';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
export var TeamSelector = function (_a) {
    var currentTeam = _a.currentTeam, teams = _a.teams, onChange = _a.onChange;
    return (React.createElement(FormControl, { variant: "outlined" },
        React.createElement(InputLabel, { htmlFor: "outlined-age-native-simple" }, "\u00C9quipe"),
        React.createElement(Select, { native: true, value: currentTeam ? currentTeam.id : null, onChange: function (event) {
                console.log(event.target.value);
                return onChange(teams.find(function (team) { return team.id === event.target.value; }));
            }, label: "Age", inputProps: {
                name: 'Équipe',
                id: 'outlined-age-native-simple',
            } },
            React.createElement("option", { "aria-label": "None", value: "" }),
            teams.map(function (team) { return React.createElement("option", { value: team.id }, team.label); }))));
};
//# sourceMappingURL=TeamSelector.js.map