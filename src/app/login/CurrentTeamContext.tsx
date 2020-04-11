import * as React from "react";
import {
  FC, useContext, useEffect, useState,
} from "react";
import { Team } from "../data/team/Team";
import { useTournament } from "../loader/TournamentContext";
import { parseElementId } from "../data/Utils";
import { CurrentTeamLogin } from "./CurrentTeamLogin";
import { getTeamCookie, setCookie } from "./TeamCookieUtils";
import { useAdmin } from "../admin/AdminManagerContext";

interface CurrentTeamManager {
  currentTeam: Team;
  setCurrentTeam: (team: Team) => void;
}

const CurrentTeamContext: React.Context<CurrentTeamManager> = React.createContext(undefined);

export const CurrentTeamManagerContext: FC = ({ children }) => {
  const [currentTeam, setCurrentTeam] = useState<Team>();
  const [tournament] = useTournament();
  const isAdmin = useAdmin();

  const setCurrentTeamAndPersist = team => {
    setCurrentTeam(team);
    setCookie(team, 10);
  };

  useEffect(() => setCurrentTeam(currentTeam || parseElementId(getTeamCookie(), tournament.teams)), [tournament]);

  return (
    <CurrentTeamContext.Provider value={{ currentTeam, setCurrentTeam: setCurrentTeamAndPersist }}>
      {!currentTeam && !isAdmin ? <CurrentTeamLogin /> : children}
    </CurrentTeamContext.Provider>
  );
};

export const useCurrentTeam: () => [Team, (team: Team) => void] = () => {
  const manager = useContext(CurrentTeamContext);

  return [manager.currentTeam, manager.setCurrentTeam];
};
