import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

// import * as jose from 'jose';

export async function middleware(req: NextRequest) {
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

	const session = await getToken({ req });

	if (!session) {
		const { protocol, host, pathname } = req.nextUrl;
		return NextResponse.redirect(
			`${protocol}//${host}/auth/login?p=${pathname}`
		);
	}

	return NextResponse.next();
}

// Only the paths declared in here will run the middleware
export const config = {
	matcher: ['/checkout/:path*'],
};
