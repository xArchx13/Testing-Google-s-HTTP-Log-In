export const config = {
  matcher: ['/', '/index.html'],
};

export default function middleware(request) {
  const USERNAME = 'admin';
  const PASSWORD = '1234';

  const authorizationHeader = request.headers.get('authorization');

  if (authorizationHeader) {
    const base64auth = authorizationHeader.split(' ')[1] || '';
    const [user, pwd] = atob(base64auth).split(':');

    if (user === USERNAME && pwd === PASSWORD) {
      return; 
    }
  }

  return new Response('Authentication Required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}
