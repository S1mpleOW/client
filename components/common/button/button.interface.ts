export default interface IButtonProps {
	type: 'button' | 'submit' | 'reset';
	disabled?: boolean;
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
	isLoading?: boolean;
	title: string;
	icon?: string | React.ReactNode;
	to?: string;
	className?: string;
	isBordered?: boolean;
}
