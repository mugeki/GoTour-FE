import { Icon } from '@iconify/react';
import Link from 'next/link';

export default function Navbar({ mode }) {
	const textColor =
		mode === 'light' ? 'text-gray-900' : mode === 'dark' ? 'text-white' : '';
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
					<a className="mx-3 hover:text-teal-200">Home</a>
				</Link>
				<Link href="/" passHref>
					<a className="mx-3 hover:text-teal-200">Explore</a>
				</Link>
				<Link href="/register" passHref>
					<a className="mx-3 hover:text-teal-200">Register</a>
				</Link>
				<Link href="/login" passHref>
					<a className="mx-3 hover:text-teal-200">Login</a>
				</Link>
			</nav>
		</header>
	);
}
