import {useState} from "react";
import {Tournament} from "../data/Tournament";
import {Team} from "../data/team/Team";
import {Game} from "../data/game/Game";
import {Rule} from "../data/rule/Rule";

export interface TournamentManager {
    tournament: Tournament;
    refresh: () => void;
}

const loadTeams = (driveKey: string, setTeamsData: (data: Team[]) => void) => ({
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

const loadGames = (driveKey: string, setGamesData: (data: Game[]) => void) => ({
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
                    time: new Date(today.getFullYear(), today.getMonth(), today.getDate(), dateArray[0], dateArray[1],0, 0),
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

const loadRules = (driveKey: string, setGamesData: (data: Rule[]) => void) => ({
    load: () => {
        // @ts-ignore
        const query = new google.visualization.Query("https://docs.google.com/spreadsheets/d/" + driveKey + "/gviz/tq?sheet=Rules&headers=1");
        query.send((response) => {
            const driveData = response.getDataTable();
            const rulesData: Rule[] = [];
            for (let i = 0; i < driveData.getNumberOfRows(); i++) {
                rulesData.push({
                    label: driveData.getValue(i, 0) as string,
                } as Rule);
            }
            setGamesData(rulesData);
        });
    }
});

let flag = true;

export const useTournamentData: (driveKey: string, isAdmin: boolean) => TournamentManager = (driveKey, isAdmin) => {
    const [teams, setTeams] = useState<Team[]>();
    const [games, setGames] = useState<Game[]>();
    const [rules, setRules] = useState<Rule[]>();

    const teamsDataLoaderTemp = (loadTeams(driveKey, setTeams));
    const gamesDataLoaderTemp = (loadGames(driveKey, setGames));
    const ruleDataLoaderTemp = (loadRules(driveKey, setRules));

    if (flag) {

        // @ts-ignore
        google.load('visualization', '1.0', {'packages': ['controls', 'corechart', 'table']});

        // @ts-ignore
        google.setOnLoadCallback(() => {
            teamsDataLoaderTemp.load();
            gamesDataLoaderTemp.load();
            ruleDataLoaderTemp.load();

            if(isAdmin) {
                setInterval(gamesDataLoaderTemp.load, 5000);
            }
        });

        flag = false;
    }

    const refresh = () => {
        teamsDataLoaderTemp.load();
        gamesDataLoaderTemp.load();
        ruleDataLoaderTemp.load();
    };

    const tournament = teams && games && rules ? {teams, games, rules} as Tournament : undefined;


    return { tournament, refresh };
};