export function getEverydays(startDate: Date, endDate: Date): Date[] {
    const startMillis = startDate.getTime();
    const endMillis = endDate.getTime();
    const dates = [];

    for (
        let currentMillis = startMillis;
        currentMillis <= endMillis;
        currentMillis += 86400000
    ) {
        dates.push(new Date(currentMillis));
    }
    return dates;
}


export function getWorkdays(startDate: Date, endDate: Date): Date[] {
    const workdays: Date[] = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        const dayOfWeek = currentDate.getDay();
        if (dayOfWeek !== 6 && dayOfWeek !== 0) {
            workdays.push(new Date(currentDate));
        }
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return workdays;
}


export function getWeekdays(startDate: Date, endDate: Date): Date[] {
    const weekdays: Date[] = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        const dayOfWeek = currentDate.getDay();
        if (dayOfWeek == 6 || dayOfWeek == 0) {
            weekdays.push(new Date(currentDate));
        }
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return weekdays;
}


export function getDateByRepeatName(startDate: Date, endDate: Date, repeatName: string): Date[] {
    switch (repeatName) {
        case "everyday":
            return getEverydays(startDate, endDate);
        case "workday":
            return getWorkdays(startDate, endDate);
        case "weekday":
            return getWeekdays(startDate, endDate);
        default:
            return [];
    }
}