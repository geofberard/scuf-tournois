import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
var drawerWidth = 240;
var useStyles = makeStyles(function (theme) {
    var _a, _b, _c;
    return createStyles({
        root: {
            display: 'flex',
        },
        drawer: (_a = {},
            _a[theme.breakpoints.up('sm')] = {
                width: drawerWidth,
                flexShrink: 0,
            },
            _a),
        appBar: (_b = {},
            _b[theme.breakpoints.up('sm')] = {
                width: "calc(100% - " + drawerWidth + "px)",
                marginLeft: drawerWidth,
            },
            _b),
        menuButton: (_c = {
                marginRight: theme.spacing(2)
            },
            _c[theme.breakpoints.up('sm')] = {
                display: 'none',
            },
            _c),
        // necessary for content to be below app bar
        toolbar: theme.mixins.toolbar,
        drawerPaper: {
            width: drawerWidth,
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
    });
});
export var Navigation = function (_a) {
    var pages = _a.pages, currentPage = _a.currentPage, onChange = _a.onChange, children = _a.children;
    var classes = useStyles();
    var theme = useTheme();
    var _b = React.useState(false), mobileOpen = _b[0], setMobileOpen = _b[1];
    var handleDrawerToggle = function () {
        setMobileOpen(!mobileOpen);
    };
    var drawer = (React.createElement("div", null,
        React.createElement("div", { className: classes.toolbar }),
        React.createElement(Divider, null),
        React.createElement(List, null, pages.map(function (page, index) { return (React.createElement(ListItem, { button: true, key: page.label, onClick: function () { return onChange(page); }, selected: page === currentPage },
            React.createElement(ListItemIcon, null,
                React.createElement(page.Icon, { color: page === currentPage ? "primary" : "inherit" })),
            React.createElement(ListItemText, { primary: page.label }))); })),
        React.createElement(Divider, null),
        React.createElement(ListItem, { button: true },
            React.createElement(ListItemIcon, null,
                React.createElement(ExitToAppIcon, null)),
            React.createElement(ListItemText, { primary: "Quitter" }))));
    return (React.createElement("div", { className: classes.root },
        React.createElement(CssBaseline, null),
        React.createElement(AppBar, { position: "fixed", className: classes.appBar },
            React.createElement(Toolbar, null,
                React.createElement(IconButton, { color: "inherit", "aria-label": "open drawer", edge: "start", onClick: handleDrawerToggle, className: classes.menuButton },
                    React.createElement(MenuIcon, null)),
                React.createElement(Typography, { variant: "h6", noWrap: true }, "Tournois SCUF"))),
        React.createElement("nav", { className: classes.drawer, "aria-label": "mailbox folders" },
            React.createElement(Hidden, { smUp: true, implementation: "css" },
                React.createElement(Drawer, { variant: "temporary", anchor: theme.direction === 'rtl' ? 'right' : 'left', open: mobileOpen, onClose: handleDrawerToggle, classes: {
                        paper: classes.drawerPaper,
                    }, ModalProps: {
                        keepMounted: true,
                    } }, drawer)),
            React.createElement(Hidden, { xsDown: true, implementation: "css" },
                React.createElement(Drawer, { classes: {
                        paper: classes.drawerPaper,
                    }, variant: "permanent", open: true }, drawer))),
        React.createElement("main", { className: classes.content },
            React.createElement("div", { className: classes.toolbar }),
            children)));
};
//# sourceMappingURL=Navigation.js.map