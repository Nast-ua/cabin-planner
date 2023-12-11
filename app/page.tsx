import PrimaryButton from "@/components/primary-button";
import { auth } from "@clerk/nextjs";
import Link from "next/link";

export default async function Home() {
  const { userId } = await auth(); // get user from databank

  const href = userId ? "/my-events" : "/new-user";
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-slate-100/25  py-5 px-4">
      <div className="w-full max-w-[600px] mx-auto justify-center">
        <h1 className="text-6xl mb-4">Your Cabin Planner</h1>
        <p className="text-2xl text-black/60 mb-4">
          Hit Get Started to start planning your next trip
        </p>

        <Link href={href}>
          <PrimaryButton label="Get Started" />
        </Link>
      </div>
    </div>
  );
}
