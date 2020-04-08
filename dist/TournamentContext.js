import * as React from 'react';
import { useContext } from 'react';
import { useTournamentData } from "./useTournamentData";
var driveKey = "1qJoXQP4ECRrhydxb76WmtPMQbjDDe4ccM-xtJZ3ZNPU";
var TournamentContext = React.createContext(undefined);
export var TournamentDataManager = function (_a) {
    var children = _a.children;
    var data = useTournamentData(driveKey);
    return !data ? React.createElement(React.Fragment, null, "\"Wait ....\"") : (React.createElement(TournamentContext.Provider, { value: data }, children));
};
export var useTournament = function () { return useContext(TournamentContext) || {}; };
//# sourceMappingURL=TournamentContext.js.map