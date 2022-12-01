// Someday we will implement this

import * as settings from '../../config/settings';

export type ScrapeResult = {
    titles: string[];
    messages: string;
    whole: string;
};
export type ScrapeError = {
    error: string;
};

export async function messageScrape(): Promise<ScrapeResult | ScrapeError> {
    try {
        const results = await fetch(settings.scrapeUrl);
        if (results.body === null) {
            return { error: 'no data was returned, how?' };
        } else {
            return results.json();
        }
    } catch (e) {
        // ! Log to sentry because this is bad
        console.log('Error fetching from alert api: ', e);
        return { error: e as string };
    }
}
