import { SignIn } from "@clerk/nextjs";

export const SignInPage = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-slate-100/25 py-5 px-4">
      <SignIn />
    </div>
  );
};

export default SignInPage;
