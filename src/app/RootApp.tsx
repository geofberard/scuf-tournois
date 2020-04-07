import * as React from 'react';
import {FC, useState} from 'react';
import {useTournamentData} from "./useTournamentData";
import {ResultsView} from "./view/ResultsView";
import {TeamSelector} from "./TeamSelector";
import {Team} from "./data/team/Team";
import {Navigation} from "./Navigation";
import {LocationMap, Results, Rules, Schedule, Teams} from "./data/navigation/Pages";
import {Page} from "./data/navigation/Page";
import {TeamsView} from "./view/TeamsView";
import {ScheduleView} from "./view/ScheduleView";

const driveKey = "1qJoXQP4ECRrhydxb76WmtPMQbjDDe4ccM-xtJZ3ZNPU";

const ALL_PAGES = [Results, Schedule, Rules, Teams, LocationMap];

export const RootApp: FC = () => {
    const data = useTournamentData(driveKey);
    const [currentTeam, setCurrentTeam] = useState<Team>();
    const [currentPage, setCurrentPage] = useState<Page>(ALL_PAGES[0]);

    console.log(data);

    return !data ? <>"Wait ...."</> : (
        <Navigation pages={ALL_PAGES} currentPage={currentPage} onChange={setCurrentPage}>
            <TeamSelector currentTeam={currentTeam} teams={data.teams} onChange={setCurrentTeam}/>
            {(currentPage === Results) && <ResultsView tournament={data} currentTeam={currentTeam}/>}
            {(currentPage === Schedule) && <ScheduleView tournament={data} currentTeam={currentTeam}/>}
            {(currentPage === Teams) && <TeamsView tournament={data} currentTeam={currentTeam}/>}
        </Navigation>
    );
};