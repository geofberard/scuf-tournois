import * as React from 'react';
import {FC, useContext, useEffect, useState} from 'react';
import {Team} from "./data/team/Team";
import {useTournament} from "./TournamentContext";
import {parseElementId} from "./data/Utils";


interface CurrentTeamManagerValue {
    currentTeam: Team;
    setCurrentTeam: (team: Team) => void;
}

const CurrentTeamContext: React.Context<CurrentTeamManagerValue> = React.createContext(undefined);

const TEAM_CNAME = "team";

const getTeamCookie = () => {
    const name = TEAM_CNAME + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};

const setCookie = (team: Team | undefined, exdays: number) => {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    document.cookie = `${TEAM_CNAME}=${team ? team.id : ""};expires=${d.toUTCString()}`;
};

export const CurrentTeamManager: FC = ({children}) => {
    const [currentTeam, setCurrentTeam] = useState<Team>();
    const tournament = useTournament();

    let setCurrentTeamAndPersist = (team) => {
        setCurrentTeam(team);
        setCookie(team, 10);
    };

    useEffect(() => setCurrentTeam(currentTeam || parseElementId(getTeamCookie(), tournament.teams)),[tournament]);

    return (
        <CurrentTeamContext.Provider value={{currentTeam, setCurrentTeam: setCurrentTeamAndPersist}}>
            {children}
        </CurrentTeamContext.Provider>
    );
};

export const useCurrentTeam: () => [Team, (team: Team) => void] = () => {
    const manager = useContext(CurrentTeamContext);

    return [manager.currentTeam, manager.setCurrentTeam]
}