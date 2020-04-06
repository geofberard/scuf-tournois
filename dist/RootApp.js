var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as React from 'react';
import { useState } from 'react';
import { useTournamentData } from "./useTournamentData";
import { ResultsTable } from "./ResultsTable";
import { TeamSelector } from "./TeamSelector";
var driveKey = "1qJoXQP4ECRrhydxb76WmtPMQbjDDe4ccM-xtJZ3ZNPU";
export var RootApp = function () {
    var data = useTournamentData(driveKey);
    var _a = useState(), team = _a[0], setTeam = _a[1];
    return !data ? React.createElement(React.Fragment, null, "\"Wait ....\"") : (React.createElement(React.Fragment, null,
        React.createElement(ResultsTable, { teams: data.teams, focus: team }),
        React.createElement(TeamSelector, __assign({ currentTeam: team, teams: data.teams, onChange: true }, setTeam))));
};
//# sourceMappingURL=RootApp.js.map