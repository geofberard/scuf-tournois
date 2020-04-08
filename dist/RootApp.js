import * as React from 'react';
import { RankingView } from "./view/RankingView";
import { TeamSelector } from "./TeamSelector";
import { Navigation } from "./Navigation";
import { LocationMap, Ranking, Results, Rules, Schedule, Teams } from "./data/navigation/Pages";
import { TeamsView } from "./view/TeamsView";
import { ScheduleView } from "./view/ScheduleView";
import { useNavigation } from "./useNavigation";
import { ResultsView } from "./view/ResultsView";
import { TournamentDataManager } from "./TournamentContext";
import { CurrentTeamManager } from "./CurrentTeamContext";
var ALL_PAGES = [Ranking, Schedule, Results, Rules, Teams, LocationMap];
export var RootApp = function () {
    var _a = useNavigation(ALL_PAGES), currentPage = _a[0], setCurrentPage = _a[1];
    return (React.createElement(TournamentDataManager, null,
        React.createElement(CurrentTeamManager, null,
            React.createElement(Navigation, { pages: ALL_PAGES, currentPage: currentPage, onChange: setCurrentPage },
                React.createElement(TeamSelector, null),
                (currentPage === Ranking) && React.createElement(RankingView, null),
                (currentPage === Schedule) && React.createElement(ScheduleView, null),
                (currentPage === Results) && React.createElement(ResultsView, null),
                (currentPage === Teams) && React.createElement(TeamsView, null)))));
};
//# sourceMappingURL=RootApp.js.map