export const date2String = (date: Date) => {
    if (!(date instanceof Date)) return { date: '', time: '', datetime: '', weekDay: '' };
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'UTC',
    };
    const formattedDate = new Intl.DateTimeFormat('pl-PL', options).format(date);
    const [datePart, timePart] = formattedDate.split(', ');
    const weekday = new Intl.DateTimeFormat('pl-PL', { weekday: 'long' }).format(date);
    return { date: datePart, time: timePart, datetime: formattedDate, weekday: weekday };
}

export const YYYY_MM_DD2Date = (dateString: string): Date | null => {
    const [year, month, day] = dateString.split('_').map(part => parseInt(part, 10));
    if (isNaN(year) || isNaN(month) || isNaN(day)) return null;
    return new Date(Date.UTC(year, month - 1, day));
}

export const date2YYYY_MM_DD = (date: Date) => {
    if (!(date instanceof Date)) return '';
    return date.toISOString().split('T')[0].replace(/-/g, '_')
}

export const getCurrentDateInPolishTimezone = (): Date => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Europe/Warsaw',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    };
    const formattedDate = new Intl.DateTimeFormat('pl-PL', options).format(now);
    const [datePart, timePart] = formattedDate.split(', ');
    const [day, month, year] = datePart.split('.').map(part => parseInt(part, 10));
    const [hours, minutes, seconds] = timePart.split(':').map(part => parseInt(part, 10));
    return new Date(Date.UTC(year, month - 1, day, hours, minutes, seconds));
}