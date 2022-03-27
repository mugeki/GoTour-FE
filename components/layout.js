import Head from 'next/head';
import Navbar from './elements/navbar';

export default function Layout({ children, navbarStyle = 'light' }) {
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
			{children}
		</>
	);
}
