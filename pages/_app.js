import { MantineProvider } from '@mantine/core';
import { parseCookies } from 'nookies';
import '../styles/globals.css';
import { redirect } from '../utils/helper';

function App({ Component, pageProps }) {
	return (
		<MantineProvider
			theme={{
				colors: {
					primary: [
						'#f4fbfb',
						'#ddf2f1',
						'#c3e8e7',
						'#a7dddb',
						'#86d1ce',
						'#61c2bf',
						'#33b1ad',
						'#009994',
						'#007975',
						'#004745',
					],
				},
				primaryColor: 'primary',
			}}
		>
			<Component {...pageProps} />
		</MantineProvider>
	);
}

App.getInitialProps = async ({ Component, ctx }) => {
	const { token } = parseCookies(ctx);

	let pageProps = {};

	if (Component.getInitialProps) {
		pageProps = await Component.getInitialProps(ctx);
	}

	const isProtectedRoute =
		ctx.pathname === '/wishlist' || ctx.pathname === '/submitted-places';
	const isAuthRoute = ctx.pathname === '/login' || ctx.pathname === '/register';

	if (!token && isProtectedRoute) {
		redirect(ctx, '/login');
	}

	if (token && isAuthRoute) {
		redirect(ctx, '/');
	}
	return { pageProps };
};

export default App;
