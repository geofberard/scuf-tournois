import * as React from 'react';
import {FC} from 'react';
import {RankingView} from "./view/RankingView";
import {TeamSelector} from "./TeamSelector";
import {Navigation} from "./Navigation";
import {LocationMap, Ranking, Results, Rules, Schedule, Teams} from "./data/navigation/Pages";
import {TeamsView} from "./view/TeamsView";
import {ScheduleView} from "./view/ScheduleView";
import {useNavigation} from "./useNavigation";
import {ResultsView} from "./view/ResultsView";
import {TournamentDataManager} from "./TournamentContext";
import {CurrentTeamManager} from "./CurrentTeamContext";
import {RulesView} from "./view/RulesView";

const ALL_PAGES = [Ranking, Schedule, Results, Rules, Teams, LocationMap];

export const RootApp: FC = () => {
    const [currentPage, setCurrentPage] = useNavigation(ALL_PAGES);

    return (
        <TournamentDataManager>
            <CurrentTeamManager>
                <Navigation pages={ALL_PAGES} currentPage={currentPage} onChange={setCurrentPage}>
                    <TeamSelector/>
                    {(currentPage === Ranking) && <RankingView/>}
                    {(currentPage === Schedule) && <ScheduleView/>}
                    {(currentPage === Results) && <ResultsView/>}
                    {(currentPage === Teams) && <TeamsView/>}
                    {(currentPage === Rules) && <RulesView/>}
                </Navigation>
            </CurrentTeamManager>
        </TournamentDataManager>
    );
};