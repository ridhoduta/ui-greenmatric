import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function proxy(request: NextRequest) {
  const token = request.cookies.get('greenmetric_token')?.value;
  const userRole = request.cookies.get('greenmetric_user_role')?.value;
  const path = request.nextUrl.pathname;

  if (path.startsWith('/page')) {
    if (!token) {
      const url = new URL('/login', request.url);
      url.searchParams.set('redirect', path);
      return NextResponse.redirect(url);
    }

    if (path.startsWith('/page/super-admin') && userRole !== 'SUPER_ADMIN') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    if (path.startsWith('/page/admin/campuses') && userRole !== 'SUPER_ADMIN') {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    if (path.startsWith('/page/dashboard/admin/users') && userRole !== 'SUPER_ADMIN' && userRole !== 'ADMIN_KAMPUS') {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    if (path.startsWith('/page/dashboard/categories/')) {
      const category = path.split('/').pop()?.toUpperCase();
      if (category && userRole && userRole.startsWith('OPERATOR_') && userRole !== `OPERATOR_${category}`) {
        return NextResponse.redirect(new URL('/login', request.url));
      }
    }
  }

  if (path === '/login' && token) {
    return NextResponse.redirect(new URL('/page/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/page/dashboard/:path*', '/page/login'],
};
