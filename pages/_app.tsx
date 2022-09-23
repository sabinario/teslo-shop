import '../styles/globals.css';

import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';

import { AuthProvider, CartProvider, UIProvider } from '../context';
import { CssBaseline, ThemeProvider } from '../shared';
import { lightTheme } from '../themes';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<SWRConfig
			value={{
				fetcher: (resource, init) =>
					fetch(resource, init).then((res) => res.json()),
			}}
		>
			<AuthProvider>
				<CartProvider>
					<UIProvider>
						<ThemeProvider theme={lightTheme}>
							<CssBaseline />
							<Component {...pageProps} />
						</ThemeProvider>
					</UIProvider>
				</CartProvider>
			</AuthProvider>
		</SWRConfig>
	);
}

export default MyApp;
