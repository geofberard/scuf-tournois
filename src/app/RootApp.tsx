import * as React from 'react';
import {FC, useState} from 'react';
import {RankingView} from "./view/RankingView";
import {TeamSelector} from "./TeamSelector";
import {Team} from "./data/team/Team";
import {Navigation} from "./Navigation";
import {LocationMap, Ranking, Results, Rules, Schedule, Teams} from "./data/navigation/Pages";
import {TeamsView} from "./view/TeamsView";
import {ScheduleView} from "./view/ScheduleView";
import {useNavigation} from "./useNavigation";
import {ResultsView} from "./view/ResultsView";
import {TournamentDataManager} from "./TournamentContext";

const ALL_PAGES = [Ranking, Schedule, Results, Rules, Teams, LocationMap];

export const RootApp: FC = () => {
    const [currentPage, setCurrentPage] = useNavigation(ALL_PAGES);
    const [currentTeam, setCurrentTeam] = useState<Team>();

    return (
        <TournamentDataManager>
            <Navigation pages={ALL_PAGES} currentPage={currentPage} onChange={setCurrentPage}>
                <TeamSelector currentTeam={currentTeam} onChange={setCurrentTeam}/>
                {(currentPage === Ranking) && <RankingView currentTeam={currentTeam}/>}
                {(currentPage === Schedule) && <ScheduleView currentTeam={currentTeam}/>}
                {(currentPage === Results) && <ResultsView currentTeam={currentTeam}/>}
                {(currentPage === Teams) && <TeamsView currentTeam={currentTeam}/>}
            </Navigation>
        </TournamentDataManager>
    );
};