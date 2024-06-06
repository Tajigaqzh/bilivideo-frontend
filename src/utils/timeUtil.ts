export function formatTimeStr(str: number, withHour: boolean) {
    const hour = Math.floor(str / 3600) >= 10 ? Math.floor(str / 3600) : "0" + Math.floor(str / 3600);

    const minute = Math.floor((str % 3600) / 60) >= 10 ? Math.floor((str % 3600) / 60) : "0" + Math.floor((str % 3600) / 60);

    const second = (str % 3600) % 60;

    if (!withHour || hour === "00") {
        return minute.toString() + ":" + (second < 10 ? "0" + second : second);
    }

    return hour.toString() + ":" + minute.toString() + ":" + (second < 10 ? "0" + second : second);

}
