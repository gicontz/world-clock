export type timeZone = 
    | 'Asia/Singapore'
    | 'Asia/Manila'
    | 'Asia/Tokyo'
    | 'Asia/Seoul'
    | 'Australia/Melbourne'
    | 'Australia/Sydney'
    | 'Europe/London'
    | 'Europe/Paris'
    | 'Europe/Berlin'
    | 'America/New_York'
    | 'America/Los_Angeles';

export type TTimeZonelist = Record<timeZone, { offset: number, timeZone: string, abbrev: string }>;

export const TimeZones: TTimeZonelist = {
    'Asia/Singapore': {
        offset: 480,
        timeZone: 'GMT+8',
        abbrev: '+08'
    },
    'Asia/Manila': {
        offset: 480,
        timeZone: 'GMT+8',
        abbrev: 'PST'
    },
    'Asia/Tokyo':  {
        offset: 540,
        timeZone: 'GMT+9',
        abbrev: 'JST'
    },
    'Asia/Seoul':  {
        offset: 540,
        timeZone: 'GMT+9',
        abbrev: 'KST'
    },
    'Australia/Melbourne':  {
        offset: 600,
        timeZone: 'GMT+10',
        abbrev: 'AEST'
    },
    'Australia/Sydney':  {
        offset: 600,
        timeZone: 'GMT+10',
        abbrev: 'AEST'
    },
    'Europe/London':  {
        offset: 60,
        timeZone: 'GMT+1',
        abbrev: 'BST'
    },
    'Europe/Paris':  {
        offset: 120,
        timeZone: 'GMT+2',
        abbrev: 'CEST'
    },
    'Europe/Berlin':  {
        offset: 120,
        timeZone: 'GMT+2',
        abbrev: 'CEST'
    },
    'America/New_York':  {
        offset: -240,
        timeZone: 'GMT-4',
        abbrev: 'EDT'
    },
    'America/Los_Angeles':  {
        offset: -420,
        timeZone: 'GMT-7',
        abbrev: 'PDT'
    },
};

export const DEFAULT_TIMEZONE: timeZone = 'Asia/Manila';