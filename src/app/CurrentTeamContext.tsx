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


interface CurrentTeamManagerValue {
    currentTeam: Team;
    setCurrentTeam: (team: Team) => void;
}

const CurrentTeamContext: React.Context<CurrentTeamManagerValue> = React.createContext(undefined);

export const CurrentTeamManager: FC = ({children}) => {
    const [currentTeam, setCurrentTeam] = useState<Team>();

    return (
        <CurrentTeamContext.Provider value={{currentTeam, setCurrentTeam}}>
            {children}
        </CurrentTeamContext.Provider>
    );
};

export const useCurrentTeam: () => [Team, (team: Team) => void] = () => {
    const manager = useContext(CurrentTeamContext);

    return [manager.currentTeam, manager.setCurrentTeam]
}