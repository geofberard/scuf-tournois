import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { useTournament } from "./TournamentContext";
import { parseElementId } from "./data/Utils";
var CurrentTeamContext = React.createContext(undefined);
var TEAM_CNAME = "team";
var getTeamCookie = function () {
    var name = TEAM_CNAME + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};
var setCookie = function (team, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    document.cookie = TEAM_CNAME + "=" + (team ? team.id : "") + ";expires=" + d.toUTCString();
};
export var CurrentTeamManager = function (_a) {
    var children = _a.children;
    var _b = useState(), currentTeam = _b[0], setCurrentTeam = _b[1];
    var tournament = useTournament();
    var setCurrentTeamAndPersist = function (team) {
        setCurrentTeam(team);
        setCookie(team, 10);
    };
    useEffect(function () { return setCurrentTeam(currentTeam || parseElementId(getTeamCookie(), tournament.teams)); }, [tournament]);
    return (React.createElement(CurrentTeamContext.Provider, { value: { currentTeam: currentTeam, setCurrentTeam: setCurrentTeamAndPersist } }, children));
};
export var useCurrentTeam = function () {
    var manager = useContext(CurrentTeamContext);
    return [manager.currentTeam, manager.setCurrentTeam];
};
//# sourceMappingURL=CurrentTeamContext.js.map