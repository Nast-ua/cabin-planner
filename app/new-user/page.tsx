import { prisma } from "@/utils/db";
import { currentUser } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/dist/types/server";
import { redirect } from "next/navigation";

const createNewUser = async () => {
  const authUser = (await currentUser()) as User;

  const match = await prisma.user.findUnique({
    where: {
      clerkId: authUser.id,
    },
  });

  if (!match) {
    await prisma.user.create({
      data: {
        clerkId: authUser.id,
        email: authUser.emailAddresses[0].emailAddress,
        name: authUser.firstName,
      },
    });
  }

  return redirect("/availability");
};

const NewUserPage = async () => {
  await createNewUser();

  return <div />;
};

export default NewUserPage;
