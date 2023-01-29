import * as React from 'react';
import ISectionCardProps from './section.interface';
import styled from 'styled-components';
import Card from '@components/card/Card';

const SectionWrapper = styled.div`
	display: flex;
	align-items: center;
	column-gap: 10px;
	margin-top: 10px;
	overflow-x: auto;
	overflow-y: hidden;
	padding: 20px 5px;
	/* -ms-overflow-style: none;
	scrollbar-width: none;
	white-space: nowrap;
	&::-webkit-scrollbar {
		display: none;
	} */
`;

const SectionCards: React.FunctionComponent<ISectionCardProps> = (props) => {
	const { title, videos, className, size } = props;
	return (
		<section className={`mx-20 my-10 ${className}`}>
			<h2 className="text-3xl font-bold">{title}</h2>
			<SectionWrapper>
				{videos.length === 0 ? (
					<h2 className="text-3xl font-bold text-center">The video is not available</h2>
				) : (
					<></>
				)}
				{videos.map((video, idx) => {
					return (
						<Card
							imgUrl={video.imgUrl}
							size={size}
							key={video.sources}
							id={idx}
							videoId={video.id}
						></Card>
					);
				})}
			</SectionWrapper>
		</section>
	);
};

export default SectionCards;
