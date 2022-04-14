import { Icon } from '@iconify/react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Cookies from 'universal-cookie';
import { generateAxiosConfig, isLoggedIn } from '../../utils/helper';

export default function Navbar({ mode }) {
	const cookies = new Cookies();
	const router = useRouter();

	const textColor =
		mode === 'light' ? 'text-gray-900' : mode === 'dark' ? 'text-white' : '';
		
	const hoverColor =
		mode === 'light'
			? 'hover:text-teal-600'
			: mode === 'dark'
			? 'hover:text-teal-500'
			: '';
	const shadow = mode === 'light' ? 'shadow' : '';

	const handleLogOut = () => {
		axios.post(`${process.env.BE_API_URL}/logout`, {}, generateAxiosConfig())
			.then(res => {
				cookies.remove("token", { path: "/", domain: window.location.hostname });
				router.push("/");
			})
			.catch(err => {
				console.log(err)
			})
	}
	
	return (
		<header
			className={
				'flex flex-col md:flex-row items-center p-3 px-10 ' +
				textColor +
				' ' +
				shadow
			}
		>
			<Link href="/" passHref>
				<div className="flex items-center cursor-pointer">
					<Icon icon="ic:round-mode-of-travel" width={40} />
					<p className="font-bold text-2xl ml-1 select-none">GoTour</p>
				</div>
			</Link>
			<nav className="my-4 md:ml-auto md:my-0 text-sm font-thin">
				<Link href="/" passHref>
					<a className={'mx-3 ' + hoverColor}>Home</a>
				</Link>
				<Link href="/explore" passHref>
					<a className={'mx-3 ' + hoverColor}>Explore</a>
				</Link>
				{isLoggedIn() ? 
					<>
						<Link href="/wishlist" passHref>
							<a className={'mx-3 ' + hoverColor}>Wishlist</a>
						</Link>
						<Link href="/my-places" passHref>
							<a className={'mx-3 ' + hoverColor}>My Places</a>
						</Link>
						<div onClick={handleLogOut} className="cursor-pointer inline-block">
							<a className={'mx-3 ' + hoverColor}>Log Out</a>
						</div>
					</>
				:
					<>
						<Link href="/register" passHref>
							<a className={'mx-3 ' + hoverColor}>Register</a>
						</Link>
						<Link href="/login" passHref>
							<a className={'mx-3 ' + hoverColor}>Login</a>
						</Link>
					</>
				}
				
			</nav>
		</header>
	);
}
