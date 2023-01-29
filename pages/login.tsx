import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import styled from 'styled-components';
import Button from '@components/common/button/Button';
import { FormEventHandler } from 'react';
import createMagic from '@utils/magic-login';
import { useRouter } from 'next/router';

interface ILoginProps {}

const LoginContainer = styled.div`
	width: 100%;
	min-height: 100vh;
	background-color: #000;
	background-image: linear-gradient(rgb(0 0 0 / 60%), rgb(0 0 0 / 60%)),
		url('/static/img/login-bg.jpg');
`;

const InputStyled = styled.div`
	position: relative;
	display: flex;
	flex-direction: column-reverse;
	background-color: #333;
	& input {
		padding: 25px 20px 10px;
		border: 1px solid transparent;
		display: block;
		width: 100%;
		min-width: 300px;
		border-radius: 8px;
		transition: border 0.25s linear;
		background-color: transparent;
		outline: none;
		color: white;
		font-size: 12px;
	}

	& input {
		border-color: #333;
		font-size: 16px;
	}

	& input:focus + label,
	& input:not(:placeholder-shown) + label {
		transform: translateY(-5px);
		top: 10px;
		font-size: 12px;
	}

	& label {
		position: absolute;
		top: 50%;
		left: 20px;
		transform: translateY(-50%);
		pointer-events: none;
		color: #8c8c8c;
		transition: 0.25s linear;
		font-size: 16px;
	}
`;

const Login: React.FunctionComponent<ILoginProps> = (props) => {
	const [email, setEmail] = React.useState<string>('');
	const [errorMsg, setErrorMsg] = React.useState<string>('');
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const router = useRouter();
	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		setErrorMsg('');
		if (!email) {
			setErrorMsg('Please enter a valid email');
		}
		setIsLoading(true);
		try {
			const m = createMagic();
			const response = await m.auth.loginWithMagicLink({
				email,
			});
			console.log(response);
			if (response) {
				router.push('/');
			}
		} catch (e) {
			setErrorMsg('Error in login, please try again');
		}
	};

	React.useEffect(() => {
		const handleRouteChange = () => {
			setIsLoading(false);
		};
		router.events.on('routeChangeComplete', handleRouteChange);
		router.events.on('routeChangeError', handleRouteChange);
		return () => {
			router.events.off('routeChangeComplete', handleRouteChange);
			router.events.off('routeChangeError', handleRouteChange);
		};
	}, [router]);

	return (
		<>
			<Head>
				<title>Netflix - Login</title>
			</Head>
			<LoginContainer>
				<div className="flex items-center px-10 py-5">
					<div className="mb-4">
						<Link href="/" className="relative inline-block top-3 w-[200px] h-[60px]">
							<Image
								src="/static/img/netflix-logo.png"
								alt="Netflix Logo"
								fill
								priority={true}
								sizes="(max-width: 768px) 100px, 200px"
								className="object-cover "
							/>
						</Link>
					</div>
				</div>
				<main className="flex items-center justify-center w-full">
					<div className="min-h-[500px] bg-black bg-opacity-75 pt-16 pb-10 px-16">
						<h2 className="text-3xl font-semibold text-white">Sign in</h2>
						<form className="flex flex-col mt-10" onSubmit={handleSubmit}>
							<InputStyled>
								<input
									type="text"
									name="email"
									placeholder=" "
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
								<label htmlFor="email">Enter your email</label>
							</InputStyled>
							{errorMsg !== '' && (
								<p className="mt-3 -mb-3 text-base font-semibold uppercase text-primary">
									{errorMsg}
								</p>
							)}
							<Button
								title="Sign in"
								type="submit"
								className="flex justify-center w-full mt-6"
								isLoading={isLoading}
							></Button>
							{/* <div className="flex items-center gap-2 mt-6">
								<input type="checkbox" name="rememberMe" id="rememberMe" />
								<label htmlFor="rememberMe" className="cursor-pointer">
									Remember me
								</label>
							</div> */}
						</form>
					</div>
				</main>
			</LoginContainer>
		</>
	);
};

export default Login;
