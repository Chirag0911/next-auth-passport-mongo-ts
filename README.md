# Unified Authentication in Next.js with Passport, NextAuth, TypeScript, and MongoDB

This is a Next.js app that uses Tailwind CSS, Passport.js for local authentication, and NextAuth for Google and Facebook login. The app also uses MongoDB as the NoSQL database for storing user credentials and authentication data.

✅ Using a custom JWT as we need a unified authentication system (e.g., local and social logins share the same token format, integrating with external APIs).

## Features

1. **Signup Page** - Allows users to sign up with email and password.
2. **SignIn Page** - Users can log in with email and password or social login.
3. **Protected Page** - A Dashboard page only accessible to authenticated users.
4. **Unprotected Page** - A Home page accessible by all users.

## Tech Stack

- **Next.js** - React framework for building server-side rendered applications.
- **Tailwind CSS** - A utility-first CSS framework.
- **Passport.js** - Middleware for local authentication with username and password.
- **NextAuth.js** - Authentication provider for Google and Facebook login.
- **MongoDB** - NoSQL database for storing user information.
- **Vercel** - Hosting platform for deploying the app.

## Prerequisites

- **Node.js**: v18.20.5
- **MongoDB**: A MongoDB database to store user information.

## Setup

```
git clone https://github.com/Chirag0911/next-auth-passport-mongo-ts.git
cd nextjs-auth-app
yarn install
yarn dev
```
