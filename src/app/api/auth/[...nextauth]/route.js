import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
const argon2 = require('argon2');
import connectToDatabase from "@/lib/db";

export const authOptions = {
    providers:[
        CredentialsProvider({
            name: 'credentials',
            credentials: {},

            async authorize(credentials){
                const { username, password } = credentials;

                try {
                    // Connect to MongoDB
                    const db = await connectToDatabase();

                    // Find user by username
                    const user = await db.collection('user').findOne({ username });

                    if (!user) {
                        return null; // User not found
                    }

                    // Verify password
                    const passwordMatch = await argon2.verify(user.password, password);

                    if (!passwordMatch) {
                        return null; // Passwords don't match
                    }

                    return user; // Authentication successful
                } catch(error) {
                    console.error('Error during authentication:', error);
                    throw error; // Rethrow the error to be caught elsewhere
                }
            },
        }),
    ],
    // basePath: '/weather360',
    callbacks: {
        async jwt({ token, user }) {
            console.log(token, user);
            if(user){
                return{
                    ...token,
                    username: user.username,
                    email: user.email
                }
            }
            return token
        },
        async session({ session, token }) {
            console.log(session, token)
            return{
                ...session,
                user:{
                    ...session.user,
                    username: token.username,
                    email: token.email
                }
            }
        },
    },
    session:{
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/loginpage',
    },
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};