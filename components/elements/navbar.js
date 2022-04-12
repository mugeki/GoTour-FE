import { Icon } from '@iconify/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';

export default function Navbar({ mode }) {
	const router = useRouter();
	const cookies = new Cookies();
	const token = cookies.get('token');
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		if (token) {
			setIsLoggedIn(true);
		} else {
			setIsLoggedIn(false);
		}
	}, []);

	const handleLogout = () => {
		cookies.remove('token');
		router.push('/');
		setIsLoggedIn(false);
	};

	const textColor =
		mode === 'light' ? 'text-gray-900' : mode === 'dark' ? 'text-white' : '';
	const hoverColor =
		mode === 'light'
			? 'hover:text-teal-600'
			: mode === 'dark'
			? 'hover:text-teal-500'
			: '';
	const shadow = mode === 'light' ? 'shadow' : '';
	return (
		<header
			className={
				'flex flex-col md:flex-row items-center p-3 px-10 ' +
				textColor +
				' ' +
				shadow
			}
		>
			<div className="flex items-center">
				<Icon icon="ic:round-mode-of-travel" width={40} />
				<p className="font-bold text-2xl ml-1 cursor-default">GoTour</p>
			</div>
			<nav className="my-4 md:ml-auto md:my-0 text-sm font-thin">
				<Link href="/" passHref>
					<a className={'mx-3 ' + hoverColor}>Home</a>
				</Link>
				<Link href="/explore" passHref>
					<a className={'mx-3 ' + hoverColor}>Explore</a>
				</Link>
				{!isLoggedIn && (
					<>
						<Link href="/register" passHref>
							<a className={'mx-3 ' + hoverColor}>Register</a>
						</Link>
						<Link href="/login" passHref>
							<a className={'mx-3 ' + hoverColor}>Login</a>
						</Link>
					</>
				)}
				{isLoggedIn && (
					<>
						<Link href="/wishlist" passHref>
							<a className={'mx-3 ' + hoverColor}>My Wishlist</a>
						</Link>
						<Link href="/submitted-places" passHref>
							<a className={'mx-3 ' + hoverColor}>Submitted Places</a>
						</Link>
						<a className={'mx-3 cursor-pointer ' + hoverColor} onClick={handleLogout}>
							Logout
						</a>
					</>
				)}
			</nav>
		</header>
	);
}
