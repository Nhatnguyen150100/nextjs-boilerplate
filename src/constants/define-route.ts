const PUBLIC_ROUTES = [
  '/',
  '/auth/**',
  '/about',
  '/contact',
  '/no-internet',
  '/privacy-policy',
  '/terms-of-service',
];

const PRIVATE_ROUTES = ['/setting/**', '/contract/**'];

const DEFINE_ALL_ROUTERS = {
  HOME: '/',
  SIGN_IN: '/auth/sign-in',
  SIGN_UP: '/auth/sign-up',
  ACTIVE_ACCOUNT: '/auth/active-account',
  FORGOT_PASSWORD: '/auth/forgot-password',

  ABOUT: '/about',
  CONTACT: '/contact',
  NO_INTERNET: '/no-internet',
  PRIVACY_POLICY: '/privacy-policy',
  TERMS_OF_SERVICE: '/terms-of-service',

  SETTING: '/setting',
  CONTRACT: '/contract',
};

export { PUBLIC_ROUTES, PRIVATE_ROUTES, DEFINE_ALL_ROUTERS };
