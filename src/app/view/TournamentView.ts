import {FC} from "react";
import {Tournament} from "../data/Tournament";
import {Team} from "../data/team/Team";

interface TournamentViewProps {
    tournament: Tournament,
    currentTeam?: Team,
}

export type TournamentView = FC<TournamentViewProps>;