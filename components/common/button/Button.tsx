import * as React from 'react';
import type IButtonProps from './button.interface';
import styled from 'styled-components';
import Link from 'next/link';
import Loading from '@components/loading/Loading';

const ButtonStyled = styled.button`
	background-color: #e50914;
	color: #fff;
	border: none;
	padding: 10px 20px;
	border-radius: ${({ isBordered }: { isBordered: string; icon: string }) => isBordered};
	font-size: 1.2rem;
	cursor: pointer;
	transition: all 0.2s ease-in-out;
	display: flex;
	align-items: center;
	&:hover {
		background-color: #f40612;
	}
	i {
		font-size: 1.5rem;
		margin-right: ${({ icon }: { icon: string }) => (icon !== '' ? '10px' : '0')};
	}
	& * {
		pointer-events: none;
	}
`;

const LinkStyled = styled.button`
	background-color: #e50914;
	color: #fff;
	border: none;
	padding: 10px 20px;
	border-radius: ${({ isBordered }: { isBordered: string; icon: string }) => isBordered};
	font-size: 1.2rem;
	cursor: pointer;
	transition: all 0.2s ease-in-out;
	display: flex;
	align-items: center;
	display: inline-block;
	&:hover {
		background-color: #f40612;
	}
	i {
		font-size: 1.5rem;
		margin-right: ${({ icon }) => (icon !== '' ? '10px' : '0')};
	}
	& * {
		pointer-events: none;
	}
`;

const Button: React.FunctionComponent<IButtonProps> = (props) => {
	const isBordered = props.isBordered ? '10px' : 'unset';
	if (props.to) {
		return (
			<Link href={props.to}>
				<LinkStyled icon={typeof props.icon === 'string' ? props.icon : ''} isBordered={isBordered}>
					{props.icon && typeof props.icon === 'string' ? (
						<i className={props.icon}></i>
					) : (
						props.icon
					)}
					<span>{props.isLoading ? <Loading /> : props.title}</span>
				</LinkStyled>
			</Link>
		);
	}
	return (
		<ButtonStyled
			icon={typeof props.icon === 'string' ? props.icon : ''}
			isBordered={isBordered}
			className={props.className}
			type={props.type}
			disabled={props.isLoading}
		>
			{props.icon && typeof props.icon === 'string' ? <i className={props.icon}></i> : props.icon}
			<span>{props.isLoading ? <Loading /> : props.title}</span>
		</ButtonStyled>
	);
};

export default Button;
