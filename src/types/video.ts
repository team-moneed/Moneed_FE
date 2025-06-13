export type Video = {
    id: {
        videoId: string;
    };
    snippet: {
        title: string;
        publishedAt: string;
        description: string;
        tags: string[];
    };
};
