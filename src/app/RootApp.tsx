import * as React from 'react';
import {FC} from 'react';
import {useTournamentData} from "./useTournamentData";
import {ResultsTable} from "./ResultsTable";

const driveKey = "1qJoXQP4ECRrhydxb76WmtPMQbjDDe4ccM-xtJZ3ZNPU";

export const RootApp: FC = () => {
    const data = useTournamentData(driveKey);

    return !data ? <>"Wait ...."</> : (
        <ResultsTable teams={data.teams}/>
    );
};