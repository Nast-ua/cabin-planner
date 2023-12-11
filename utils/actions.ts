"use server";

import dayjs from "dayjs";
import { getUserByClerkID } from "./auth";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "./db";

export const update = (paths: string[] = []) =>
  paths.forEach((p) => revalidatePath(p));

export async function createReservation(formData: FormData) {
  const user = await getUserByClerkID();
  const rawFormData = Object.fromEntries(formData.entries());

  try {
    // TODO: Add server side data validation
    if (
      !rawFormData.endDate ||
      !rawFormData.startDate ||
      !rawFormData.name ||
      !rawFormData.participants ||
      !rawFormData["family-tree"]
    )
      console.log("Error Handling!");

    const duration = dayjs(rawFormData.endDate as string).diff(
      dayjs(rawFormData.startDate as string),
      "days"
    );

    const reservation = {
      name: rawFormData.name as string,
      startDate: new Date(rawFormData.startDate as string),
      endDate: new Date(rawFormData.endDate as string),
      duration,
      familyTree: rawFormData["family-tree"] as string,
      participants: parseInt(rawFormData.participants as string),
    };

    await prisma.user.update({
      where: { id: user.id },
      data: {
        events: { create: [reservation] },
      },
    });
  } catch (e) {
    // TODO: Add error handling
    console.log(e);
  }

  update(["/my-events", "/availability"]);
  redirect("/my-events");
}

export async function updateReservation(id: string, formData: FormData) {
  const user = await getUserByClerkID();
  const rawFormData = Object.fromEntries(formData.entries());

  try {
    if (!rawFormData.participants) console.log("Error Handling!");

    await prisma.event.update({
      where: { id },
      data: {
        users: { connect: { id: user.id } },
      },
    });
  } catch (e) {
    // TODO: Add error handling
    console.log(e);
  }

  update(["/my-events"]);
  redirect("/my-events");
}

export async function DeleteReservation(id: string) {
  update(["/my-events"]);
  redirect("/my-events");
}

export async function createAndUpdateReservation(
  id: string,
  formData: FormData
) {
  update(["/my-events"]);
  redirect("/my-events");
}
