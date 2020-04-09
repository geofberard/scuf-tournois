import * as React from 'react';
import {FC} from 'react';
import {RankingView} from "./view/RankingView";
import {Navigation} from "./Navigation";
import {LocationMap, Ranking, Results, Rules, Schedule, Teams} from "./data/navigation/Pages";
import {TeamsView} from "./view/TeamsView";
import {ScheduleView} from "./view/ScheduleView";
import {useNavigation} from "./useNavigation";
import {ResultsView} from "./view/ResultsView";
import {TournamentDataManager} from "./TournamentContext";
import {CurrentTeamManager} from "./login/CurrentTeamContext";
import {RulesView} from "./view/RulesView";
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import CssBaseline from "@material-ui/core/CssBaseline";

const ALL_PAGES = [Ranking, Schedule, Results, Rules, Teams, LocationMap];

const theme = createMuiTheme({
    palette: {
        error: red,
        success: green,
    },
});

export const RootApp: FC = () => {
    const [currentPage, setCurrentPage] = useNavigation(ALL_PAGES);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <TournamentDataManager>
                <CurrentTeamManager>
                    <Navigation pages={ALL_PAGES} currentPage={currentPage} onChange={setCurrentPage}>
                        {(currentPage === Ranking) && <RankingView/>}
                        {(currentPage === Schedule) && <ScheduleView/>}
                        {(currentPage === Results) && <ResultsView/>}
                        {(currentPage === Teams) && <TeamsView/>}
                        {(currentPage === Rules) && <RulesView/>}
                    </Navigation>
                </CurrentTeamManager>
            </TournamentDataManager>
        </ThemeProvider>
    );
};