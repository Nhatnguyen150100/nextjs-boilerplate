import { authService } from '@/services';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const nextAuth = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, _) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Vui lòng nhập thống tin đăng nhập');
        }
        try {
          const res = await authService.signIn({
            email: credentials?.email || '',
            password: credentials?.password || '',
          });

          const user = res.data;

          if (!user) {
            throw new Error('Tài khoản không tồn tại hoặc mật khẩu không đúng');
          }

          return {
            id: user.id,
            email: user.email,
            accessToken: res.data?.accessToken,
          };
        } catch (error: any) {
          console.error('Error during authorization:', error.response.data);
          throw new Error(
            error.response.data.message ||
              'Lỗi đăng nhập, vui lòng thử lại sau',
          );
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.accessToken = token.accessToken;
      return session;
    },
  },
  pages: {
    signIn: '/auth/sign-in',
    signOut: '/auth/sign-out',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { nextAuth as GET, nextAuth as POST };
