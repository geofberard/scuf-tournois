import * as React from 'react';
import {FC, useState} from 'react';
import {useTournamentData} from "./useTournamentData";
import {ResultsTable} from "./ResultsTable";
import {TeamSelector} from "./TeamSelector";
import {Team} from "./data/Team";

const driveKey = "1qJoXQP4ECRrhydxb76WmtPMQbjDDe4ccM-xtJZ3ZNPU";

export const RootApp: FC = () => {
    const data = useTournamentData(driveKey);
    const [currentTeam, setCurrentTeam] = useState<Team>();

    return !data ? <>"Wait ...."</> : (<>
            <TeamSelector currentTeam={currentTeam} teams={data.teams} onChange={setCurrentTeam}/>
            <ResultsTable teams={data.teams} focus={currentTeam}/>
        </>
    );
};