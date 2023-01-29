import { useDropdown } from '@context/useDropdownContext';
import * as React from 'react';
import { IDropdownOptionProps } from './dropdown.interface';

const DropdownOption: React.FunctionComponent<IDropdownOptionProps> = ({ onClick, children }) => {
	const { setIsActive } = useDropdown();
	const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
		onClick(event);
		setIsActive(false);
	};
	return (
		<div
			className="flex items-center justify-center px-5 py-4 cursor-pointer border border-b-2 border-b-[#ddd] hover:text-primary font-normal "
			onClick={handleClick}
			aria-hidden="true"
		>
			{children}
		</div>
	);
};

export default DropdownOption;
