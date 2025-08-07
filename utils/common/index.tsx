export const formatDateToPolishFormat = (date: Date) => {
    if (!(date instanceof Date)) return { date: '', time: '', full: '' };
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    };
    const formattedDate = new Intl.DateTimeFormat('pl-PL', options).format(date);
    const [datePart, timePart] = formattedDate.split(', ');
    return { date: datePart, time: timePart, full: formattedDate };
}

export const formatDateToYYYY_MM_DD = (date: Date) => {
    if (!(date instanceof Date)) return '';
    return date.toISOString().split('T')[0].replace(/-/g, '_')
}