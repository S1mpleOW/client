import * as React from 'react';
import type ICardProps from './card.interface';
import styled from 'styled-components';
import { ICardStyled } from './card.interface';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

const CardStyled = styled.div<ICardStyled>`
	width: ${({ width }) => width};
	min-width: ${({ width }) => width};
	height: ${({ height }) => height};
	min-height: ${({ height }) => height};
	position: relative;
	cursor: pointer;
`;

const CardWrapper = styled.div`
	position: absolute;
	inset: 0;
`;

const cardSize = {
	small: ['160px', '280px'],
	medium: ['300px', '170px'],
	large: ['250px', '440px'],
};

const Card: React.FunctionComponent<ICardProps> = (props) => {
	const { imgUrl, size, id, videoId } = props;
	const [width, height] = cardSize[size];
	const scaleSize = React.useMemo(() => {
		return id === 0 ? { scaleY: 1.1 } : { scale: 1.1 };
	}, [id]);
	return (
		<Link href={`/video/${videoId}`}>
			<CardStyled width={width} height={height}>
				<motion.div className="absolute inset-0 hover:z-10" whileHover={scaleSize}>
					<Image
						src={imgUrl}
						alt="image card"
						fill
						className="object-cover w-full h-full rounded-lg"
						sizes={`(max-width: 768px) ${width}, ${height}`}
					></Image>
				</motion.div>
			</CardStyled>
		</Link>
	);
};

export default Card;
