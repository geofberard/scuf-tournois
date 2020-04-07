import {Page} from "./Page";
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import TodayIcon from '@material-ui/icons/Today';
import ViewListIcon from '@material-ui/icons/ViewList';
import GroupIcon from '@material-ui/icons/Group';
import MapIcon from '@material-ui/icons/Map';

// Icons
// import SportsVolleyballIcon from '@material-ui/icons/SportsVolleyball';
// import DateRangeIcon from '@material-ui/icons/DateRange';
// import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';

export const Results: Page = {
    label: "Résultats",
    Icon: EmojiEventsIcon
};

export const Schedule: Page = {
    label: "Planning",
    Icon: TodayIcon
};

export const Rules: Page = {
    label: "Règles",
    Icon: ViewListIcon
};

export const Teams: Page = {
    label: "Équipes",
    Icon: GroupIcon
};

export const LocationMap: Page = {
    label: "Plan",
    Icon: MapIcon
};