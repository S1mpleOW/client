import React from 'react';

export interface IVideo {
	id: number | string;
	imgUrl: string;
	sources: string;
}

interface ISectionCardProps {
	title: string;
	className?: string;
	videos: IVideo[];
	size: 'small' | 'medium' | 'large';
}
export default ISectionCardProps;
