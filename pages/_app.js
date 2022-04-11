import { MantineProvider } from '@mantine/core';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
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
