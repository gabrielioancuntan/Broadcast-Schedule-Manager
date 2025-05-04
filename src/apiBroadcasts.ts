import type { Broadcasts } from "@/broadcasts";

const allBroadcasts: Broadcasts[] = [];

export function fetchBroadcasts(): Promise<Broadcasts[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(allBroadcasts);
        }, 500);
    });
}
