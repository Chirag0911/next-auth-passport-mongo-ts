import { NextRequest, NextResponse } from "next/server";
import passport from "@/lib/passport";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  await dbConnect();

  const body = await req.json();

  return new Promise((resolve) => {
    passport.authenticate("local", (err: any, user: any, info: any) => {
      if (err || !user) {
        return resolve(
          NextResponse.json(
            { message: info?.message || "Invalid credentials" },
            { status: 401 }
          )
        );
      }

      const token = jwt.sign(
        {
          id: user._id,
          username: user.username,
          email: user.email,
        },
        process.env.NEXT_PUBLIC_JWT_SECRET as string,
        { expiresIn: "1h" }
      );

      return resolve(
        NextResponse.json(
          {
            accessToken: token,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            role: user.role,
            isSuccess: true,
          },
          { status: 200 }
        )
      );
    })(
      { body, query: req.nextUrl.searchParams },
      { json: (data: any) => resolve(NextResponse.json(data)) }
    );
  });
}
