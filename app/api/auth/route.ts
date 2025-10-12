import { NextRequest, NextResponse } from "next/server";
import { getAuth, clerkClient } from "@clerk/nextjs/server";
import { db } from "@/config/db";
import { userTable } from "@/config/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  const { userId, isAuthenticated } = getAuth(req);

  const { clerkUser } = await req.json();

  // initialize JS Backend SDK
  const clerk = await clerkClient();

  // protect the route
  if (!isAuthenticated || !userId) {
    return NextResponse.json({ error: "Unauthorized Access" }, { status: 401 });
  }

  try {
    // validate request body
    if (!clerkUser) {
      return NextResponse.json(
        {
          success: false,
          message: "clerkUser missing",
        },
        { status: 400 }
      );
    }

    // compare user ID and backend ID
    if (clerkUser !== userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Access Credentials Denied!",
        },
        { status: 403 }
      );
    }

    // check if the user already exists in clerk
      const clerkUserData = await clerk.users.getUser(userId);

    if (!clerkUserData) {
      return NextResponse.json(
        {
          success: false,
          message: "Clerk user not found!",
        },
        { status: 404 }
      );
    }

    // check if the user exists in the database
    const existingUser = await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, clerkUserData.emailAddresses[0]?.emailAddress))
      .limit(1);

    if (existingUser.length > 0) {
      return NextResponse.json(
        {
          success: true,
          message: "Welcome back to AstraPages",
          data: existingUser[0]
        },
        { status: 200 }
      );
    }

    // insert new user into the database
    const newUser = await db
      .insert(userTable)
      .values({
        name: clerkUserData.fullName ?? "",
        email: clerkUserData.emailAddresses[0]?.emailAddress,
        credits: 10,
      })
      .returning({
        id: userTable.id,
        name: userTable.name,
        email: userTable.email,
        credits: userTable.credits,
      });

    return NextResponse.json(
      {
        success: true,
        message: "Your profile has been saved!",
        data: newUser[0],
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("Internal Server Error:", error);
  }
}
