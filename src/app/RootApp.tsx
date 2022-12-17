import * as React from "react";
import { FC } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import CssBaseline from "@material-ui/core/CssBaseline";
import { RankingView } from "./view/RankingView";
import { Navigation } from "./navigation/Navigation";
import {
  LocationMap, QrCode, Ranking, Results, Rules, Schedule, Teams,
} from "./data/navigation/Pages";
import { TeamsView } from "./view/TeamsView";
import { ScheduleView } from "./view/ScheduleView";
import { useNavigation } from "./navigation/useNavigation";
import { ResultsView } from "./view/ResultsView";
import { TournamentDataManagerContext } from "./loader/TournamentContext";
import { CurrentTeamManagerContext } from "./login/CurrentTeamContext";
import { RulesView } from "./view/RulesView";
import { AdminManagerContext } from "./admin/AdminManagerContext";
import { LocationMapView } from "./view/LocationMapView";
import { QrCodeView } from "./view/QrCodeView";

const ALL_PAGES = [Ranking, Schedule, Results, Rules, Teams, LocationMap, QrCode];

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#000",
    },
    error: red,
    success: green,
  },
});

export const RootApp: FC = () => {
  const [currentPage, setCurrentPage] = useNavigation(ALL_PAGES);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AdminManagerContext>
        <TournamentDataManagerContext>
          <CurrentTeamManagerContext>
            <Navigation pages={ALL_PAGES} currentPage={currentPage} onChange={setCurrentPage}>
              {(currentPage === Ranking) && <RankingView />}
              {(currentPage === Schedule) && <ScheduleView />}
              {(currentPage === Results) && <ResultsView />}
              {(currentPage === Teams) && <TeamsView />}
              {(currentPage === Rules) && <RulesView />}
              {(currentPage === LocationMap) && <LocationMapView />}
              {(currentPage === QrCode) && <QrCodeView />}
            </Navigation>
          </CurrentTeamManagerContext>
        </TournamentDataManagerContext>
      </AdminManagerContext>
    </ThemeProvider>
  );
};
