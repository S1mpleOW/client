import Navbar from '@components/navbar/Navbar';
import { getVideoById } from '@utils/getVideos';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import * as React from 'react';
import Modal from 'react-modal';

interface IStatistics {
	viewCount: number;
	likeCount: number;
}

interface IVideo {
	title: string;
	publishedAt: string;
	description: string;
	channelTitle: string;
	statistics: IStatistics;
}

interface IVideoPageProps {
	video: IVideo;
}
Modal.setAppElement('#__next');

export const getStaticPaths: GetStaticPaths = async () => {
	const videos = ['u5NmlCarb3M'];
	const paths = videos.map((id) => {
		return {
			params: {
				videoId: id,
			},
		};
	});
	return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async (context) => {
	const params = context.params;
	if (typeof params === 'undefined') {
		throw new Error('Video id is undefined');
	}
	const videoId = params.videoId as string;
	const videos: IVideo[] = await getVideoById(videoId);
	return {
		props: {
			video: videos.length > 0 ? videos[0] : {},
		},
		revalidate: 10,
	};
};

const VideoPage: React.FunctionComponent<IVideoPageProps> = ({ video }) => {
	const router = useRouter();
	const query = router.query;
	const videoId = query.videoId;
	const {
		title,
		publishedAt,
		description,
		channelTitle,
		statistics: { viewCount = 0 },
	} = video;
	if (!videoId) <></>;
	return (
		<>
			<Navbar visible></Navbar>
			<Modal
				isOpen={true}
				contentLabel="Watch the video"
				overlayClassName={'inset-0 w-full h-screen'}
				className={
					'absolute left-0 right-0 mx-auto w-[1000px] mb-10 bg-black bg-opacity-40 outline-none rounded-xl border border-solid border-gray-800 top-[15%] p-5'
				}
			>
				<div>
					<iframe
						src={`https://www.youtube.com/embed/${videoId}?autoplay=0&origin=http://example.com&control=0&rel=1`}
						id="ytplayer"
						width="100%"
						height="360"
						className="videoPlayer"
					></iframe>
					<div className="px-4 my-10">
						<div className="flex gap-5">
							<div className=" w-[70%]">
								<p className="mb-3 text-base text-green-200 ">{publishedAt}</p>
								<p className="mt-4 text-4xl font-bold leading-10 text-white text-opacity-90">
									{title}
								</p>
								<div className="max-h-[200px] overflow-x-hidden overflow-y-auto">
									<p className="my-3 text-gray-400">{description}</p>
								</div>
							</div>
							<div className="flex flex-col gap-2 w-[30%]">
								<p className="text-base break-words">
									<span className="font-semibold text-slate-100">Channel: </span>
									<span className="text-gray-300">{channelTitle}</span>
								</p>
								<p className="text-base break-words">
									<span className="font-semibold text-slate-100">View Count: </span>
									<span className="text-gray-300">{viewCount}</span>
								</p>
							</div>
						</div>
					</div>
				</div>
			</Modal>
		</>
	);
};

export default VideoPage;
