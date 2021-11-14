import * as React from 'react';
import { useContext } from 'react';
import { useTournamentData } from "./useTournamentData";
var driveKey = "1RQ-T1IzriFShhdmJKTpHOasAOOxyIPLUU56Wwm2CL_o";
var TournamentContext = React.createContext(undefined);
export var TournamentDataManager = function (_a) {
    var children = _a.children;
    var data = useTournamentData(driveKey);
    return !data ? React.createElement(React.Fragment, null, "\"Wait ....\"") : (React.createElement(TournamentContext.Provider, { value: data }, children));
};
export var useTournament = function () { return useContext(TournamentContext) || {}; };
//# sourceMappingURL=TournamentContext.js.map
//https://docs.google.com/spreadsheets/d/1RQ-T1IzriFShhdmJKTpHOasAOOxyIPLUU56Wwm2CL_o/edit?usp=sharing