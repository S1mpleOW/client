import * as React from 'react';
import type IBannerProps from './interface';
import styled from 'styled-components';
import Image from 'next/image';
import Button from '../common/button/Button';

const BackgroundImage = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	inset: 0;
	background-size: cover;
	background-position: 50% 50%;
	z-index: 10;
`;

const BackgroundGradient = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	inset: 0;
	background: rgba(0, 0, 0, 0.4);
	background-image: linear-gradient(
		0deg,
		rgba(0, 0, 0, 0.8) 0,
		transparent 60%,
		rgba(0, 0, 0, 0.8)
	);
`;

const Banner: React.FunctionComponent<IBannerProps> = (props) => {
	return (
		<div className="relative w-full h-screen">
			<div className="absolute w-full h-full px-16 py-[80px] z-20">
				<div className="flex flex-col w-full justify-center items-center py-[80px] mx-auto gap-5">
					<h1 className="md:text-5xl max-w-[700px] leading-4 mx-auto text-center">{props.title}</h1>
					<p className="md:text-xl max-w-[700px]">{props.description}</p>
					<div className="mt-3">
						<Button type="button" title="Start Now" icon="fas fa-play"></Button>
					</div>
				</div>
			</div>
			<BackgroundImage>
				<Image
					src="/static/img/home-bg.jpg"
					alt="Netflix Background Image"
					width={1920}
					height={1080}
					className="object-cover w-full h-screen -z-10"
				></Image>
				<BackgroundGradient></BackgroundGradient>
			</BackgroundImage>
		</div>
	);
};

export default Banner;
