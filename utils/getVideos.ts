interface IParams {
	query?: string;
	size?: 'default' | 'medium' | 'high';
	url?: string;
}

export async function getVideos({ query = '', size = 'medium', url }: IParams) {
	try {
		const apiKey = process.env.YOUTUBE_API_KEY;
		const BASE_URL = `https://youtube.googleapis.com/youtube/v3`;
		const URL = url || `search?part=snippet&maxResults=25&q=${query || ''}&type=video`;
		const response = await fetch(`${BASE_URL}/${URL}&key=${apiKey}`);
		const data = await response.json();
		const items = data?.items || [];
		const filteredItems = items.filter((item: any) => item.id || item.id.videoId);
		const videos = filteredItems.map((video: any) => {
			const snippet = video.snippet;
			return {
				id: (video.id.videoId as string) || video.id,
				imgUrl: snippet.thumbnails[size].url,
				sources: (video.id.videoId as string) || video.id,
				description: snippet.description,
				title: snippet.title,
				publishedAt: snippet.publishedAt,
				channelId: snippet.channelId,
				channelTitle: snippet.channelTitle,
				statistics: video.statistics ? video.statistics : 0,
			};
		});
		return videos;
	} catch (error) {
		return [];
	}
}

export async function getPopularVideos() {
	return await getVideos({
		url: `videos?part=snippet&chart=mostPopular&maxResults=25`,
		size: `medium`,
	});
}

export async function getVideoById(videoId: string) {
	return await getVideos({
		url: `videos?part=snippet%2CcontentDetails%2cstatistics&id=${videoId}`,
	});
}
