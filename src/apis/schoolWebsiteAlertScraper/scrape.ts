// Someday we will implement this

import * as settings from '../../config/settings';

export type ScrapeResult = {
    title: string | null;
    dateFor: string | null;
    messages: string[] | null;
    debug: {
        messageList: string | null;
        messageListItems: string | null;
        wholeThing: string | null;
        dates: { match: string; index: number }[] | null;
    };
};
export type ScrapeError = {
    error: string;
    debug?: {
        messageList: string | null;
        messageListItems: string | null;
        wholeThing: string | null;
        dates: { match: string; index: number }[] | null;
    };
};

export async function messageScrape(): Promise<ScrapeResult | ScrapeError> {
    try {
        const results = await fetch(settings.scrapeUrl);
        if (results.body === null) {
            return { error: 'no data was returned, how?' };
        } else {
            const json = await results.json();
            if (json.error !== undefined) {
                return json as ScrapeError;
            }
            return json as ScrapeResult;
        }
    } catch (e) {
        // ! Log to sentry because this is bad
        console.log('Error fetching from alert api: ', e);
        return { error: 'Error fetching' };
    }
}
