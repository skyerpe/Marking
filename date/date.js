const date = new Date();
const actualTime = date.toLocaleString("zh-CN", {timeZone: "Asia/Shanghai", hour12: false});
exports.actualTime = actualTime;