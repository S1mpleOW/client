import * as React from 'react';
import { useDropdown } from '@context/useDropdownContext';
import type { IDropdownProps } from './dropdown.interface';

const Dropdown = React.forwardRef<HTMLDivElement, IDropdownProps>((props, ref) => {
	const { isActive } = useDropdown();
	return (
		<div
			className={`z-50 inline-block absolute right-0 overflow-hidden origin-top-right top-[calc(100%+10px)] w-full shadow-lg transition-all duration-300 ease-in-out -translate-y-5 ${
				isActive ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible'
			}`}
			ref={ref}
		>
			{props.children}
		</div>
	);
});

export default Dropdown;
