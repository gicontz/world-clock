import { timeZone as TTimeZones, TimeZones, TTimeZonelist } from '../constants/timeZones';

export const convertDateTime = (dateTime: Date, tz: TTimeZones, tzList?: TTimeZonelist) => {
    const theTzList = tzList || TimeZones;
    console.log('tz', tz, tzList);
    const utcTime = dateTime.getTime() + (dateTime.getTimezoneOffset() * 60000);
    const convertedDate = new Date(utcTime + (theTzList[tz].offset * 60000));
    const shownTime = `${("0" + convertedDate.getHours()).slice(-2)}:${("0" + convertedDate.getMinutes()).slice(-2)}`;
    const timeDiff = (dateTime.getTimezoneOffset() + theTzList[tz].offset)/60;
    const absoluteHrs = Math.abs(timeDiff);

    return {
        utcTime,
        convertedDate,
        shownTime,
        timeDiff,
        absoluteHrs,
    }
}