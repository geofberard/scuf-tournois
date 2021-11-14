import * as React from "react";
import { FC } from "react";
import AppBar from "@material-ui/core/AppBar";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import VisibilityIcon from "@material-ui/icons/Visibility";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import RefreshIcon from "@material-ui/icons/Refresh";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {
  createStyles, makeStyles, Theme, useTheme,
} from "@material-ui/core/styles";
import { Page } from "../data/navigation/Page";
import { useCurrentTeam } from "../login/CurrentTeamContext";
import { useTournament } from "../loader/TournamentContext";
import { useAdmin } from "../admin/AdminManagerContext";
import { TeamSelector } from "../login/TeamSelector";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    drawer: {
      [theme.breakpoints.up("md")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up("md")]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    exitButton: {
      marginLeft: theme.spacing(2),
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    title: {
      flexGrow: 1,
    },
    logo: {
      height: 55,
      marginRight: 15,
    },
    drawerSelect: {
      paddingTop: 15,
    },
  }));

interface NavigationProps {
    pages: Page[],
    currentPage: Page,
    onChange: (page: Page) => void
}

export const Navigation: FC<NavigationProps> = ({
  pages, currentPage, onChange, children,
}) => {
  const [currentTeam, setCurrentTeam] = useCurrentTeam();
  const [, refresh] = useTournament();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isAdmin = useAdmin();

  const classes = useStyles();
  const theme = useTheme();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      {!isAdmin ? <div className={classes.toolbar} /> : (
        <ListItem className={classes.drawerSelect}>
          <TeamSelector />
        </ListItem>
      )}
      <Divider />
      <List>
        {pages.map(page => (
          <ListItem
            button
            key={page.label}
            onClick={() => {
              setMobileOpen(false);
              onChange(page);
            }}
            selected={page === currentPage}
          >
            <ListItemIcon>
              <page.Icon color={page === currentPage ? "primary" : "inherit"} />
            </ListItemIcon>
            <ListItemText primary={page.label} />
          </ListItem>
        ))}
      </List>
      {!isAdmin && (
        <>
          <Divider />
          <ListItem button>
            <ListItemIcon><ExitToAppIcon /></ListItemIcon>
            <ListItemText primary="Quitter" onClick={() => setCurrentTeam(undefined)} />
          </ListItem>
        </>
      )}
      {isAdmin && currentTeam && (
        <>
          <Divider />
          <ListItem button>
            <ListItemIcon><VisibilityIcon /></ListItemIcon>
            <ListItemText primary="Tout voir" onClick={() => setCurrentTeam(undefined)} />
          </ListItem>
        </>
      )}
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <img className={classes.logo} src="img/scuf-logo.png" alt="SCUF" />
          <Typography variant="h5" noWrap className={classes.title}>
            Tournois
          </Typography>
          {currentTeam && !isAdmin && (
            <Typography variant="h6">
              {currentTeam.label}
            </Typography>
          )}
          <IconButton
            aria-label="show 4 new mails"
            color="inherit"
            className={classes.exitButton}
            onClick={refresh}
          >
            <RefreshIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden mdUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
};
