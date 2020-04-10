import * as React from 'react';
import {FC, useContext} from 'react';
import {TournamentManager, useTournamentData} from "./useTournamentData";
import {Tournament} from "../data/Tournament";

const driveKey = "1qJoXQP4ECRrhydxb76WmtPMQbjDDe4ccM-xtJZ3ZNPU";

const TournamentContext: React.Context<TournamentManager> = React.createContext(undefined);

export const TournamentDataManagerContext: FC = ({children}) => {
    const data = useTournamentData(driveKey);

    return !data.tournament ? <>"Wait ...."</> : (
        <TournamentContext.Provider value={data}>
            {children}
        </TournamentContext.Provider>
    );
};

export const useTournament: () => [Tournament, () => void] = () => {
    const manager = useContext(TournamentContext);

    return [manager.tournament, manager.refresh]
}