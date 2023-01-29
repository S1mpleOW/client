import { useDropdown } from '@context/useDropdownContext';
import * as React from 'react';
import type { IDropdownSelectProps } from './dropdown.interface';

const DropdownSelect: React.FunctionComponent<IDropdownSelectProps> = ({
	placeholder = 'Please select an option',
	children,
	hasIcon = false,
}) => {
	const { isActive, setIsActive } = useDropdown();
	return (
		<div
			className={`flex items-center justify-between py-[10px] px-[20px] border border-[#E7ECF3] cursor-pointer min-w-[150px] font-medium relative`}
			onClick={() => setIsActive(!isActive)}
			aria-hidden="true"
		>
			<div className="flex items-center gap-2">
				{hasIcon ? <i className="fas fa-globe" aria-hidden="true"></i> : <></>}
				<span>{placeholder}</span>
			</div>
			<span className="ml-3">
				{isActive ? (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="w-6 h-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth="2"
					>
						<path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
					</svg>
				) : (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="w-6 h-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth="2"
					>
						<path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
					</svg>
				)}
			</span>
			{isActive && children}
		</div>
	);
};

export default DropdownSelect;
