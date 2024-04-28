import { connectMongoDB } from "@/lib/db";
import User from "@/models/user";
import { NextResponse } from "next/server";
const argon2 = require('argon2');

export async function POST(req) {
    try {
      const { name, email, password } = await req.json();
      const hashedPassword = await argon2.hash(password, 10);
      await connectMongoDB();
      await User.create({ name, email, password: hashedPassword });
  
      return NextResponse.json({ message: "User registered." }, { status: 201 });
    } catch (error) {
      return NextResponse.json(
        { message: "An error occurred while registering the user." },
        { status: 500 }
      );
    }
  }