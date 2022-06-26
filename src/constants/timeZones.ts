export type timeZone = 
    | 'Asia/Singapore'
    | 'Asia/Tokyo'
    | 'Asia/Seoul'
    | 'Australia/Melbourne'
    | 'Australia/Sydney'
    | 'Europe/London'
    | 'Europe/Paris'
    | 'Europe/Berlin'
    | 'America/New York'
    | 'America/Los Angeles';

export const TimeZones: Record<timeZone, { offset: number, timeZone: string, abbrev: string }> = {
    'Asia/Singapore': {
        offset: 480,
        timeZone: 'GMT+8',
        abbrev: 'SST'
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
    'America/New York':  {
        offset: -240,
        timeZone: 'GMT-4',
        abbrev: 'EDT'
    },
    'America/Los Angeles':  {
        offset: -420,
        timeZone: 'GMT-7',
        abbrev: 'PDT'
    },
};