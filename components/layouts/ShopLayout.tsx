import { ReactNode } from 'react';

import Head from 'next/head';

import { Navbar, SideMenu } from '../ui';

interface Props {
	title: string;
	pageDescription: string;
	imgFullUrl?: string;
	children: ReactNode;
}

export const ShopLayout = ({
	title,
	pageDescription,
	imgFullUrl,
	children,
}: Props) => {
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name='description' content={pageDescription} />
				<meta name='og:title' content={title} />
				<meta name='og:description' content={pageDescription} />
				{imgFullUrl && <meta name='og:image' content={imgFullUrl} />}
			</Head>

			<nav>
				<Navbar />
			</nav>

			<SideMenu />
			<main
				style={{ margin: '80px auto', maxWidth: '1440px', padding: '0 30px' }}
			>
				{children}
				{/* footer */}
				<footer>{/* custom footer */}</footer>
			</main>
		</>
	);
};
