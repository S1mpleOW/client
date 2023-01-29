import * as React from 'react';
import type { IDropdownListProps } from './dropdown.interface';

const DropdownList: React.FunctionComponent<IDropdownListProps> = ({
	children,
	classNameBody = '',
}) => {
	return (
		<div className={`w-full shadow-sm z-1 border border-solid border-gray-300  ${classNameBody} `}>
			{children}
		</div>
	);
};

export default DropdownList;
