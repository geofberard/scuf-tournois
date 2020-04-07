export interface Game {
    id: string;
    time: Date;
    court: string;
    teamA: string;
    teamB: string;
    referee: string;
    scoreA: number,
    scoreB: number,
}