import {FC} from "react";
import {Tournament} from "../data/Tournament";
import {Team} from "../data/team/Team";

interface TournamentViewProps {
    currentTeam?: Team,
}

export type TournamentView = FC<TournamentViewProps>;