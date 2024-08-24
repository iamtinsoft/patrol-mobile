export function splitDate(date) {
    let obj = date.split("T");
    return obj[0];
}

export function formatTime(timeString) {
    const [hourString, minute] = timeString.split(":");
    const hour = +hourString % 24;
    return (hour % 12 || 12) + ":" + minute + (hour < 12 ? "AM" : "PM");
}

export function splitDateTime(date) {
    let obj = date.split("T");
    let res = formatTime(obj[1]);
    return res;
}
