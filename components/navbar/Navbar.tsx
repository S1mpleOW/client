import * as React from 'react';
import type INavbarProps from './navbar.interface';
import Link from 'next/link';
import Image from 'next/image';
import Button from '../common/button/Button';
import {
	Dropdown,
	DropdownSelect,
	DropdownList,
	DropdownOption,
} from '@components/common/dropdown';
import useDetectOutsideClick from '@hooks/useDetectOutsideClick';
import createMagic from '@utils/magic-login';

const Navbar: React.FunctionComponent<INavbarProps> = ({ visible = true }) => {
	const dropdownRef = React.useRef<HTMLDivElement>(null);
	const [username, setUsername] = React.useState<string>('');
	const [,] = useDetectOutsideClick({
		elements: dropdownRef,
	});

	const [language, setLanguage] = React.useState<'English' | 'Việt Nam'>('English');
	const handleChangeLanguage = (language: 'English' | 'Việt Nam') => {
		setLanguage(language);
	};

	const handleSignOut = async () => {
		try {
			const res = await createMagic().user.logout();
			if (res) {
				setUsername('');
			}
		} catch (e) {
			console.log(e);
		}
	};

	React.useEffect(() => {
		(async () => {
			try {
				const userInfo = await createMagic().user.getMetadata();
				if (userInfo && userInfo.email) {
					setUsername(userInfo.email);
				} else {
					setUsername('');
				}
			} catch (e) {
				console.log(e);
			}
		})();
	}, []);

	return (
		<div
			className={`fixed z-50 w-full ${
				visible ? 'top-0' : 'top-[-120px]'
			} transition-all duration-500 ease-out`}
		>
			<div className="flex items-center px-10 py-5">
				<div className="mb-4">
					<Link href="/" className="relative inline-block top-3 w-[200px] h-[60px]">
						<Image
							src="/static/img/netflix-logo.png"
							alt="Netflix Logo"
							fill
							sizes="(max-width: 768px) 100px, 200px"
							className="object-cover "
						/>
					</Link>
				</div>
				<nav className="flex items-center gap-3 ml-8">
					<Link href="#" className="mr-5 text-lg font-semibold text-white">
						My list
					</Link>
				</nav>
				<div className="flex items-center gap-10 ml-auto">
					{username === '' ? (
						<>
							<DropdownSelect placeholder={language} hasIcon>
								<Dropdown ref={dropdownRef}>
									<DropdownList>
										<DropdownOption onClick={() => handleChangeLanguage('English')}>
											English
										</DropdownOption>
										<DropdownOption onClick={() => handleChangeLanguage('Việt Nam')}>
											Việt Nam
										</DropdownOption>
									</DropdownList>
								</Dropdown>
							</DropdownSelect>
							<Button type="button" title="Sign in" to="/login"></Button>
						</>
					) : (
						<DropdownSelect placeholder={username}>
							<Dropdown ref={dropdownRef}>
								<DropdownList>
									<DropdownOption onClick={handleSignOut}>Logout</DropdownOption>
								</DropdownList>
							</Dropdown>
						</DropdownSelect>
					)}
				</div>
			</div>
		</div>
	);
};

export default Navbar;
