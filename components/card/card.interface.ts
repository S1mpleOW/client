export default interface ICardProps {
	size: 'small' | 'medium' | 'large';
	imgUrl: string;
	id: string | number;
	videoId: string | number;
}

export interface ICardStyled {
	width: string;
	height: string;
}
