import * as React from 'react';
import {FC, useState} from 'react';
import {useTournamentData} from "./useTournamentData";
import {RankingView} from "./view/RankingView";
import {TeamSelector} from "./TeamSelector";
import {Team} from "./data/team/Team";
import {Navigation} from "./Navigation";
import {LocationMap, Ranking, Results, Rules, Schedule, Teams} from "./data/navigation/Pages";
import {TeamsView} from "./view/TeamsView";
import {ScheduleView} from "./view/ScheduleView";
import {useNavigation} from "./useNavigation";

const driveKey = "1qJoXQP4ECRrhydxb76WmtPMQbjDDe4ccM-xtJZ3ZNPU";

const ALL_PAGES = [Ranking, Schedule, Results, Rules, Teams, LocationMap];

export const RootApp: FC = () => {
    const data = useTournamentData(driveKey);
    const [currentPage, setCurrentPage] = useNavigation(ALL_PAGES);
    const [currentTeam, setCurrentTeam] = useState<Team>();

    return !data ? <>"Wait ...."</> : (
        <Navigation pages={ALL_PAGES} currentPage={currentPage} onChange={setCurrentPage}>
            <TeamSelector currentTeam={currentTeam} teams={data.teams} onChange={setCurrentTeam}/>
            {(currentPage === Ranking) && <RankingView tournament={data} currentTeam={currentTeam}/>}
            {(currentPage === Schedule) && <ScheduleView tournament={data} currentTeam={currentTeam}/>}
            {(currentPage === Teams) && <TeamsView tournament={data} currentTeam={currentTeam}/>}
        </Navigation>
    );
};