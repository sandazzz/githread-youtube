import { AuthOptions, getServerSession } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { env } from "@/lib/env";
import { prisma } from "@/lib/prisma";

export const authOption: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
      profile(profile) {
        //console.log({profile})
        return {
          id: profile.id.toString(),
          username: profile.login,
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
    }),
  ],
  callbacks: {
    session({ session, user }) {
      if (!session?.user) return session;
      session.user.id = user.id;
      return session;
    },
  },
};

export const getAuthSession = async () => {
  const session = getServerSession(authOption);
  return session;
};
