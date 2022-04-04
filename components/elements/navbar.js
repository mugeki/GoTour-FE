import { Icon } from '@iconify/react';
import Link from 'next/link';

export default function Navbar({ mode }) {
	const textColor =
		mode === 'light' ? 'text-gray-900' : mode === 'dark' ? 'text-white' : '';
	const hoverColor =
		mode === 'light' ? 'hover:text-teal-600' : mode === 'dark' ? 'hover:text-teal-200' : '';
	return (
		<header
			className={'flex flex-col md:flex-row items-center p-3 px-10 ' + textColor}
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
				<Link href="/register" passHref>
					<a className={'mx-3 ' + hoverColor}>Register</a>
				</Link>
				<Link href="/login" passHref>
					<a className={'mx-3 ' + hoverColor}>Login</a>
				</Link>
			</nav>
		</header>
	);
}
