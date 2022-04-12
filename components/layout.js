import Head from 'next/head';
import { useRouter } from 'next/router';
import Navbar from './elements/navbar';

export default function Layout({ children, navbarStyle = 'light' }) {
	const router = useRouter();
	return (
		<>
			<Head>
				<title>GoTour</title>
				<meta
					name="description"
					content="Find the perfect destination for your trip"
				/>
				<link rel="icon" href="/" />
			</Head>
			<Navbar mode={navbarStyle} />
			{router.pathname === '/' && <>{children}</>}
			{router.pathname !== '/' && (
				<div className={navbarStyle === 'light' ? 'bg-[#FCFCFC]' : ''}>
					{children}
				</div>
			)}
		</>
	);
}
