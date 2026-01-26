import { logger } from "./logger";

export const safeFetch = async (url: string) => {
    try {
        const response = await fetch(url, {
            method: "GET",
            cache: "no-store",
            headers: { Accept: "application/json" },
        });

        if (response.ok && response.status === 204) {
            return { ok: true, status: 204, data: null };
        }

        const text = await response.text();
        let data;
        try {
            data = JSON.parse(text);
        } catch (error) {
            logger.error(`Invalid JSON returned from ${url}\ndata: ${text}`, { error });
            return undefined;
        }

        if (!response.ok) {
            logger.warn(`Bad response from ${url}\n\nstatus: ${response.status}\ndata: ${data}`);
        }

        return { ok: response.ok, status: response.status, data };
    } catch (error) {
        logger.error(`Fetch api failed for ${url}`, { error });
        return undefined;
    }
};
