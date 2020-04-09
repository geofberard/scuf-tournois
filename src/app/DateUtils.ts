export const now = () => {
    const date = new Date();
    date.setHours(13);
    date.setMinutes(50);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
}