import axios from 'axios';

export const fetchShorts = async () => {
    const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
            part: 'snippet',
            q: '주식 쇼츠',
            type: 'video',
            videoDuration: 'short',
            maxResults: 20,
            key: YOUTUBE_API_KEY,
        },
    });
    return response.data.items;
};

/* 인기순으로 조회한 후 주식관련 데이터만 필터링*/
// const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
//     params: {
//         part: 'snippet',
//         chart: 'mostPopular',
//         regionCode: 'KR',
//         maxResults: 100,
//         key: YOUTUBE_API_KEY,
//     },
// });

// const keywords = ['주식쇼츠', '주식 쇼츠', '주식', '투자', '재테크', '경제'];

// const filteredData = items.filter((item: Video) => {
//     const title = item.snippet?.title ?? '';
//     const description = item.snippet?.description ?? '';
//     const tags = item.snippet?.tags ?? [];

//     const text = `${title} ${description} ${tags.join(' ')}`;

//     return keywords.some(keyword => text.includes(keyword));
// });
