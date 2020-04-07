import * as React from 'react';
import {FC, useState} from 'react';
import {useTournamentData} from "./useTournamentData";
import {ResultsTable} from "./ResultsTable";
import {TeamSelector} from "./TeamSelector";
import {Team} from "./data/Team";
import {Navigation} from "./Navigation";
import {LocationMap, Results, Rules, Schedule, Teams} from "./data/Pages";
import {Page} from "./data/Page";
import {TeamsTable} from "./TeamsTable";

const driveKey = "1qJoXQP4ECRrhydxb76WmtPMQbjDDe4ccM-xtJZ3ZNPU";

const ALL_PAGES = [Results, Schedule, Rules, Teams, LocationMap];

export const RootApp: FC = () => {
    const data = useTournamentData(driveKey);
    const [currentTeam, setCurrentTeam] = useState<Team>();
    const [currentPage, setCurrentPage] = useState<Page>(ALL_PAGES[0]);

    return !data ? <>"Wait ...."</> : (
        <Navigation pages={ALL_PAGES} currentPage={currentPage} onChange={setCurrentPage}>
            <TeamSelector currentTeam={currentTeam} teams={data.teams} onChange={setCurrentTeam}/>
            {(currentPage === Results) && <ResultsTable teams={data.teams} focus={currentTeam}/>}
            {(currentPage === Teams) && <TeamsTable teams={data.teams} focus={currentTeam}/>}
        </Navigation>
    );
};