import { Magic } from 'magic-sdk';

const createMagic = () => {
	if (!process.env.NEXT_PUBLIC_MAGIC_PUBLIC) {
		throw new Error('Must provided magic key');
	}
	if (typeof window === 'undefined') {
		throw new Error('Window is undefined');
	}
	return new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLIC);
};

export default createMagic;
