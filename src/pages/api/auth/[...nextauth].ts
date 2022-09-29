import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';

import { dbUsers } from 'database';

export const authOptions: NextAuthOptions = {
	// Configure one or more authentication providers
	providers: [
		CredentialsProvider({
			name: 'Email',
			credentials: {
				email: {
					label: 'Correo',
					type: 'email',
					placeholder: 'correo@correo.com',
				},
				password: {
					label: 'Contraseña',
					type: 'password',
					placeholder: 'Contraseña',
				},
			},
			async authorize(credentials) {
				return await dbUsers.checkUserEmailPassword(
					credentials!.email,
					credentials!.password
				);
			},
		}),
		// ...add more providers here
		GithubProvider({
			clientId: process.env.GITHUB_ID!,
			clientSecret: process.env.GITHUB_SECRET!,
		}),
	],

	// Custom pages
	pages: {
		signIn: '/auth/login',
		newUser: '/auth/register',
	},

	session: {
		maxAge: 2592000,
		strategy: 'jwt',
	},

	// callbacks: sirven para procesar la información que regresan los providers

	callbacks: {
		async jwt({ token, account, user }) {
			if (account) {
				token.accessToken = account._token;

				switch (account.type) {
					case 'credentials':
						token.user = user;
						break;
					case 'oauth':
						token.user = await dbUsers.logOAuthUser(
							user?.email || '',
							user?.name || ''
						);
						break;
				}
			}

			return token;
		},

		async session({ session, token, user }) {
			session.accessToken = token.accessToken;
			session.user = token.user as any;

			return session;
		},
	},
};
export default NextAuth(authOptions);
