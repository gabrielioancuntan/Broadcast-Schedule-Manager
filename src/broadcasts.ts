export interface Broadcasts {
    id: string;
    title: string;
    channel: string;
    start: string;
    end: string;
}

export type timeFilter = "all" | "start" | "end";