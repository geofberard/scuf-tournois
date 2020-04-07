import {useState} from "react";
import {Tournament} from "./data/Tournament";
import {Team} from "./data/Team";
import {Game} from "./data/Game";

let flag = true;

const loadTeamData = (driveKey: string, setTeamsData: (data: Team[]) => void) => ({
    load: () => {
        // @ts-ignore
        const query = new google.visualization.Query("https://docs.google.com/spreadsheets/d/" + driveKey + "/gviz/tq?sheet=Teams&headers=1");
        query.send((response) => {
            const driveData = response.getDataTable();
            const teamsData: Team[] = [];
            for (let i = 0; i < driveData.getNumberOfRows(); i++) {
                teamsData.push({
                    id: driveData.getValue(i, 0) as string,
                    label: driveData.getValue(i, 1) as string,
                } as Team);
            }
            setTeamsData(teamsData);
        });
    }
});

const loadGameData = (driveKey: string, setGamesData: (data: Game[]) => void) => ({
    load: () => {
        const today: Date = new Date(Date.now());
        // @ts-ignore
        const query = new google.visualization.Query("https://docs.google.com/spreadsheets/d/" + driveKey + "/gviz/tq?sheet=Games&headers=1");
        query.send((response) => {
            const driveData = response.getDataTable();
            const gamesData: Game[] = [];
            for (let i = 0; i < driveData.getNumberOfRows(); i++) {
                const dateArray = driveData.getValue(i, 0);
                let teamA = driveData.getValue(i, 2) as string;
                let teamB = driveData.getValue(i, 3) as string;
                gamesData.push({
                    id: "" + dateArray[0] + dateArray[1] + teamA + teamB,
                    time: new Date(today.getFullYear(), today.getMonth(), today.getDate(), dateArray[0], dateArray[1]),
                    court: driveData.getValue(i, 1) as string,
                    teamA: teamA,
                    teamB: teamB,
                    referee: driveData.getValue(i, 4),
                    scoreA: driveData.getValue(i, 5) as number,
                    scoreB: driveData.getValue(i, 6) as number,
                } as Game);
            }
            setGamesData(gamesData);
        });
    }
});

export const useTournamentData: (driveKey: string) => Tournament = (driveKey) => {
    const [teams, setTeams] = useState<Team[]>([]);
    const [games, setGames] = useState<Game[]>([]);

    if (flag) {
        const teamsDataLoaderTemp = (loadTeamData(driveKey, setTeams));
        const gamesDataLoaderTemp = (loadGameData(driveKey, setGames));

        // @ts-ignore
        google.load('visualization', '1.0', {'packages': ['controls', 'corechart', 'table']});

        // @ts-ignore
        google.setOnLoadCallback(() => {
            teamsDataLoaderTemp.load();
            setInterval(teamsDataLoaderTemp.load, 5000);
        });

        // @ts-ignore
        google.setOnLoadCallback(() => {
            gamesDataLoaderTemp.load();
            setInterval(gamesDataLoaderTemp.load, 5000);
        });

        flag = false;
    }

    return {teams,games } as Tournament;
};