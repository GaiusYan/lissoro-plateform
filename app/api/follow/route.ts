import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const currentUserId = session?.user?.id;

    const [currentUser, targetUser] = await Promise.all([
      prisma.user.findUnique({ where: { id: currentUserId } }),
      prisma.user.findUnique({ where: { id: userId } }),
    ]);

    if (!currentUser || !targetUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (currentUserId === userId) {
      return NextResponse.json({ error: "You cannot follow yourself" }, { status: 400 });
    }

    await prisma.user.update({
      where: { id: currentUserId },
      data: {
        followingIds: {
          push: userId,
        },
      },
    });

    

    await prisma.notification.create({
      data: {
        userId: userId,
        content: `🎉 ${currentUser?.name ? currentUser?.name : currentUser?.email } vient de vous suivre`,
        type: "follow",
      }
    });


    return NextResponse.json({ message: "Followed successfully" });

  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}



export async function DELETE(req: NextRequest) {
  try {
    const { userId } = await req.json();
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const currentUserId = session.user.id;
    

    if (currentUserId === userId) {
      return NextResponse.json(
        { error: "You cannot unfollow yourself" },
        { status: 400 }
      );
    }

   


    const currentUser = await prisma.user.findUnique({
        where: {
            id: currentUserId,
        }
    });

    if (!currentUser) {
        throw new Error("No user");
    }

    await prisma.user.update({
      where: { id: currentUserId },
          data: {
              followingIds: {
              set : currentUser?.followingIds.filter((id : string) => id !== userId),
              },
          },
    });


    await prisma.notification.create({
      data: {
        userId: userId,
        content: `😡 ${currentUser?.name ? currentUser?.name : currentUser?.email } vient de se désabonner`,
        type: "unfollow",
      }
    });

    return NextResponse.json({ message: "Unfollowed successfully" });

  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}