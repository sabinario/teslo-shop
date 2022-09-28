import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

// import * as jose from 'jose';

export async function middleware(req: NextRequest) {
	const session: any = await getToken({ req });

	// if (request.nextUrl.pathname.startsWith('/checkout')) {
	//     try {
	//         await jose.jwtVerify(
	//             request.cookies.get('token') as string,
	//             new TextEncoder().encode(process.env.JWT_SECRET_SEED)
	//         );
	//
	//         return NextResponse.next();
	//     } catch (err) {
	//         const { protocol, host, pathname } = request.nexturl;
	//         return NextResponse.redirect(`${protocol}//${host}/auth/login?p=${pathname}`);
	//     }
	// }

	if (!session) {
		if (req.nextUrl.pathname.startsWith('/api/admin')) {
			return NextResponse.redirect(new URL(`/api/auth/unauthorized`, req.url));
		}
		const requestPage = req.nextUrl.pathname;
		return NextResponse.redirect(new URL(`/auth/login?p=${requestPage}`));
	}

	const validRoles = ['admin', 'super-user'];

	if (req.nextUrl.pathname.startsWith('/admin')) {
		if (!validRoles.includes(session.user.role)) {
			return NextResponse.redirect(new URL('/', req.url));
		}
	}

	if (req.nextUrl.pathname.startsWith('/api/admin')) {
		if (!validRoles.includes(session.user.role)) {
			return NextResponse.redirect(new URL('/api/auth/unauthorized', req.url));
		}
	}

	/* const { protocol, host, pathname } = req.nextUrl;
		return NextResponse.redirect(
			`${protocol}//${host}/auth/login?p=${pathname}`
		); */

	return NextResponse.next();
}

// Only the paths declared in here will run the middleware
export const config = {
	matcher: ['/checkout/:path*', '/admin/:path*', '/api/admin/:path*'],
};
