import { auth, currentUser, redirectToSignIn } from "@clerk/nextjs";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";
import { createNewUser } from "./actions";
import { prisma } from "./db";

export const getAuthUser = async () => {
  try {
    const authUser = await currentUser();

    if (!authUser) throw new Error("No auth user");

    return authUser;
  } catch (error) {
    console.log(error);
    redirectToSignIn({ returnBackUrl: "/my-events" });
  }
};

export const createNewUserFromAuth = async () => {
  const authUser = await getAuthUser();

  if (authUser) {
    const match = await prisma.user.findUnique({
      where: {
        clerkId: authUser.id,
      },
    });

    if (!match) await createNewUser(authUser);

    redirect("/my-events");
  }
};

export const getUserByClerkID = async () => {
  try {
    const { userId } = await auth();

    if (!userId) throw new Error("No auth user");

    return await prisma.user.findUniqueOrThrow({
      where: { clerkId: userId },
    });
  } catch (error) {
    if (error instanceof Error && error.message === "No auth user")
      redirectToSignIn({ returnBackUrl: "/my-events" });
    else if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    )
      redirect("./new-user");
    else console.log(error);
  }
};
