import Head from 'next/head';
import Banner from '../components/banner/Banner';
import Navbar from '../components/navbar/Navbar';
import { DropdownProvider } from '@context/useDropdownContext';
import SectionCards from '@components/section/SectionCards';
import { IVideo } from '@components/section/section.interface';
import { GetServerSideProps } from 'next';
import { getPopularVideos, getVideos } from '@utils/getVideos';
import { useEffect, useState } from 'react';
import useScrollDirection from '@hooks/useScrollDirection';

interface IHomeProps {
	actionVideos: IVideo[];
	popularVideos: IVideo[];
	funnyVideos: IVideo[];
	childrenVideos: IVideo[];
}

export const getServerSideProps: GetServerSideProps = async () => {
	const actionVideos = await getVideos({
		query: 'action trailer',
		size: 'high',
	});
	const popularVideos = await getPopularVideos();
	const funnyVideos = await getVideos({
		query: 'funny',
		size: 'medium',
	});
	const childrenVideos = await getVideos({
		query: 'disney trailer',
		size: 'medium',
	});
	return {
		props: {
			actionVideos,
			popularVideos,
			funnyVideos,
			childrenVideos,
		},
	};
};

const Home: React.FC<IHomeProps> = (props) => {
	const { actionVideos = [], childrenVideos = [], funnyVideos = [], popularVideos = [] } = props;
	const direction = useScrollDirection();

	return (
		<>
			<Head>
				<title>Netflix - Home</title>
			</Head>
			<DropdownProvider>
				<Navbar visible={direction === 'up'}></Navbar>
			</DropdownProvider>
			<Banner
				title="Unlimited movies, TV shows, and more."
				description="Watch anywhere. Cancel anytime."
				imgUrl="/static/img/home-bg.jpg"
			></Banner>
			<SectionCards title="Popular" videos={popularVideos} size="medium"></SectionCards>
			<SectionCards title="Action" videos={actionVideos} size="medium"></SectionCards>
			<SectionCards title="Funny" videos={funnyVideos} size="large"></SectionCards>
			<SectionCards title="Children" videos={childrenVideos} size="medium"></SectionCards>
		</>
	);
};
export default Home;
