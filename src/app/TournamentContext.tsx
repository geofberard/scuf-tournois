import * as React from 'react';
import {FC, useContext, useState} from 'react';
import {useTournamentData} from "./useTournamentData";
import {RankingView} from "./view/RankingView";
import {TeamSelector} from "./TeamSelector";
import {Team} from "./data/team/Team";
import {Navigation} from "./Navigation";
import {LocationMap, Ranking, Results, Rules, Schedule, Teams} from "./data/navigation/Pages";
import {TeamsView} from "./view/TeamsView";
import {ScheduleView} from "./view/ScheduleView";
import {useNavigation} from "./useNavigation";
import {ResultsView} from "./view/ResultsView";
import {Tournament} from "./data/Tournament";

const driveKey = "1qJoXQP4ECRrhydxb76WmtPMQbjDDe4ccM-xtJZ3ZNPU";

const TournamentContext: React.Context<Tournament> = React.createContext({} as Tournament);

export const TournamentDataManager: FC = ({children}) => {
    const data = useTournamentData(driveKey);

    return !data ? <>"Wait ...."</> : (
        <TournamentContext.Provider value={data}>
            {children}
        </TournamentContext.Provider>
    );
};

export const useTournament: () => Tournament = () => useContext(TournamentContext) || {} as Tournament;