export const config = {
  // This tells Vercel to run the middleware on every single page
  matcher: ['/', '/index.html'],
};

export default function middleware(request) {
  // 1. Choose your desired credentials here
  const USERNAME = 'admin';
  const PASSWORD = 'super-secret-password';

  const authorizationHeader = request.headers.get('authorization');

  if (authorizationHeader) {
    // 2. Decode the incoming browser credentials
    const base64auth = authorizationHeader.split(' ')[1] || '';
    const [user, pwd] = atob(base64auth).split(':');

    // 3. If correct, let the user see the index.html page
    if (user === USERNAME && pwd === PASSWORD) {
      return; 
    }
  }

  // 4. If wrong or missing, instantly return a 401 and trigger the popup
  return new Response('Authentication Required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}
