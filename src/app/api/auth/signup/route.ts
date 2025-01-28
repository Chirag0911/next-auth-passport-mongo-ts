export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import User from "@/models/User";
import dbConnect from "@/lib/mongodb";
import { encryptPassword } from "@/app/utils/bcrypt";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();
    const { username, firstName, lastName, email, password } = body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email already exists", isSuccess: true },
        { status: 400 }
      );
    }

    const hashedPassword = await encryptPassword(password);

    const newUser = new User({
      username,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      loginType: "email",
    });

    await newUser.save();

    return NextResponse.json(
      { message: "User created successfully!", isSuccess: true },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
