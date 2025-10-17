import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/config/db";
import { chatTable, frameTable, projectTable } from "@/config/schema";
import { eq } from "drizzle-orm";

// Define request body shape
interface RequestBody {
  projectId: string;
  frameId: string;
  chatMessage: JSON;
}

export async function POST(req: NextRequest) {
  // Authenticate the user with clerk
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized Access!",
      },
      { status: 401 }
    );
  }

    try {
        // parse and validate request body
        const { projectId, frameId, chatMessage }: RequestBody = await req.json();

        if (!projectId || !frameId || !chatMessage) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Missing required fields!: projectId, frameId or chatMessage",
                },
                { status: 400 }
            );
        }

        // Get user's email
        const userEmail = user?.primaryEmailAddress?.emailAddress;

        if (!userEmail) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User email not found",
                },
                { status: 404 }
            );
        }

        // check if the project exists
        const existingProject = await db
            .select()
            .from(projectTable)
            .where(eq(projectTable.projectId, projectId))
            .limit(1);
      
        if (existingProject.length > 0) {
            return NextResponse.json({
                success: false,
                message: "Project with this ID already exists"
            }, { status: 409 });
        }

        // Sequentially create project, frame, and chat records
        const newProject = await db.insert(projectTable).values({
            projectId,
            createdBy: userEmail
        }).returning({id: projectTable.id, projectId: projectTable.projectId});
        
        const newFrame = await db.insert(frameTable).values({
            frameId,
            projectId
        }).returning({});

        const newChat = await db.insert(chatTable).values({
            chatMessage,
            createdBy: userEmail
        }).returning({});

        return NextResponse.json({
            success: true,
            message: "Resources created successfully",
            result: {
                project: newProject,
                frame: newFrame,
                chat: newChat
            }
        }, { status: 201 });
  } catch (error) {
    console.log("Error creating resources:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
