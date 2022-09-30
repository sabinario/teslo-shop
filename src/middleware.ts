import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

// import * as jose from 'jose';

export async function middleware(req: NextRequest) {
	const session: any = await getToken({ req });
	const { protocol, host, pathname } = req.nextUrl;

	if (!session) {
		if (req.nextUrl.pathname.startsWith('/api/admin')) {
			return NextResponse.redirect(
				`${protocol}//${host}/api/auth/unauthorized`
			);
		}
		return NextResponse.redirect(
			`${protocol}//${host}/auth/login?p=${pathname}`
		);
	}

	const validRoles = ['admin', 'super-user'];

	if (req.nextUrl.pathname.startsWith('/admin')) {
		if (!validRoles.includes(session.user.role)) {
			return NextResponse.redirect(`${protocol}//${host}/`);
		}
	}

	if (req.nextUrl.pathname.startsWith('/api/admin')) {
		if (!validRoles.includes(session.user.role)) {
			return NextResponse.redirect(
				`${protocol}//${host}/api/auth/unauthorized`
			);
		}
	}

	return NextResponse.next();
}

// Only the paths declared in here will run the middleware
export const config = {
	matcher: ['/checkout/:path*', '/admin/:path*', '/api/admin/:path*'],
};
