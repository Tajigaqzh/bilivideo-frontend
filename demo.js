function formatTimeToStr(str) {
    const hour = Math.floor(str / 3600) > 10 ? Math.floor(str / 3600) : "0" + Math.floor(str / 3600);

    const minute = Math.floor((str % 3600) / 60) > 10 ? Math.floor((str % 3600) / 60) : "0" + Math.floor((str % 3600) / 60);

    const second = (str % 3600) % 60;
    if (hour === "00") {
        return minute.toString() + ":" + second;
    } else {
        return hour.toString() + ":" + minute.toString() + ":" + second;
    }
}
