import {Team} from "../data/team/Team";

const TEAM_CNAME = "team";

export const getTeamCookie = () => {
    const name = TEAM_CNAME + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};

export const setCookie = (team: Team | undefined, exdays: number) => {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    document.cookie = `${TEAM_CNAME}=${team ? team.id : ""};expires=${d.toUTCString()}`;
};