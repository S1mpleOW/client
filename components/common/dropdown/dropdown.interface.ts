interface IDropdownProps {
	children?: React.ReactNode;
}

interface IDropdownListProps {
	children: React.ReactNode;
	classNameBody?: string;
}

interface IDropdownSelectProps {
	placeholder?: string;
	children?: React.ReactNode;
	hasIcon?: boolean;
}

interface IDropdownOptionProps {
	onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
	children: React.ReactNode;
}

export type { IDropdownProps, IDropdownListProps, IDropdownSelectProps, IDropdownOptionProps };
