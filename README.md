# Next.js App with Authentication and MongoDB

This is a Next.js app that uses Tailwind CSS, Passport.js for local authentication, and NextAuth.js for Google and Facebook login. The app also uses MongoDB as the NoSQL database for storing user credentials and authentication data.

## Features

1. **Signup Page** - Allows users to sign up with email and password.
2. **SignIn Page** - Users can log in with email and password or social login.
3. **Protected Page** - A page only accessible to authenticated users.
4. **Unprotected Page** - A page accessible by all users.

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
git clone https://github.com/your-username/nextjs-auth-app.git
cd nextjs-auth-app
yarn install
yarn dev
```
